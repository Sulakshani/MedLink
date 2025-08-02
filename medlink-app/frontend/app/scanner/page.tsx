'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import QrScanner from 'qr-scanner';

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasCamera, setHasCamera] = useState(false);
  const [manualInput, setManualInput] = useState('');

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        const hasPermission = await QrScanner.hasCamera();
        setHasCamera(hasPermission);
        
        if (hasPermission && videoRef.current) {
          const scanner = new QrScanner(
            videoRef.current,
            (result) => {
              // Extract profile ID from URL or use as is
              const profileId = result.data.includes('/view/') 
                ? result.data.split('/view/')[1]
                : result.data;
              
              if (profileId) {
                window.location.href = `/view/${profileId}`;
              }
            },
            {
              highlightScanRegion: true,
              highlightCodeOutline: true,
            }
          );
          
          setQrScanner(scanner);
        }
      } catch (err) {
        setError('Camera access denied or not available');
        console.error(err);
      }
    };

    initializeScanner();

    return () => {
      if (qrScanner) {
        qrScanner.destroy();
      }
    };
  }, []);

  const startScanning = async () => {
    if (qrScanner) {
      try {
        await qrScanner.start();
        setScanning(true);
        setError('');
      } catch (err) {
        setError('Could not start camera');
        console.error(err);
      }
    }
  };

  const stopScanning = () => {
    if (qrScanner) {
      qrScanner.stop();
      setScanning(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      const profileId = manualInput.includes('/view/') 
        ? manualInput.split('/view/')[1]
        : manualInput.trim();
      
      window.location.href = `/view/${profileId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
              <span className="ml-2 text-sm text-gray-500">QR Scanner</span>
            </div>
            <nav className="flex space-x-8">
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create Profile
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Scan QR Code</h1>
          <p className="text-gray-600">
            Point your camera at a MedLink QR code to access emergency medical information
          </p>
        </div>

        {/* Camera Scanner */}
        {hasCamera ? (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Scanner</h2>
              <p className="text-gray-600">Position the QR code within the camera frame</p>
            </div>

            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full max-w-md mx-auto rounded-lg"
                style={{ display: scanning ? 'block' : 'none' }}
              />
              
              {!scanning && (
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 min-h-[300px]">
                  <div className="text-6xl text-gray-400 mb-4">📷</div>
                  <p className="text-gray-600 mb-4">Camera preview will appear here</p>
                  {error && (
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                  )}
                  <button
                    onClick={startScanning}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Start Camera
                  </button>
                </div>
              )}
            </div>

            {scanning && (
              <div className="text-center mt-4">
                <button
                  onClick={stopScanning}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Stop Scanner
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="text-center">
              <div className="text-6xl text-red-500 mb-4">📵</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Camera Not Available</h2>
              <p className="text-gray-600 mb-4">
                Camera access is required to scan QR codes. Please check your permissions or use manual input below.
              </p>
            </div>
          </div>
        )}

        {/* Manual Input */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Manual Input</h2>
            <p className="text-gray-600">Enter the profile ID or URL manually</p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile ID or URL
              </label>
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter profile ID (e.g., ABC123XY) or full URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Access Profile
            </button>
          </form>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">How to Use</h3>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">1.</span>
              <span>Allow camera access when prompted</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">2.</span>
              <span>Point your camera at the MedLink QR code</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">3.</span>
              <span>The profile will load automatically when detected</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">4.</span>
              <span>Alternatively, enter the profile ID manually below</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
