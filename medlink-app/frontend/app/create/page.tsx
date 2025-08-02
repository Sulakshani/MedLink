'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import QRCode from 'qrcode';

interface ProfileData {
  fullName: string;
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface ApiResponse {
  id: number;
  publicId: string;
  fullName: string;
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export default function CreateProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: ''
  });
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (response) {
      const generateQRCode = async () => {
        try {
          const profileUrl = `${window.location.origin}/view/${response.publicId}`;
          const qrDataUrl = await QRCode.toDataURL(profileUrl, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(qrDataUrl);
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      };
      generateQRCode();
    }
  }, [response]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5079/api/EmergencyProfile', profile);
      setResponse(res.data);
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (response) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Created Successfully!</h1>
              <p className="text-gray-600">Your emergency profile has been created and is ready to use.</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile ID</h2>
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-blue-300">
                <p className="text-center text-2xl font-mono font-bold text-blue-600">{response.publicId}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Save this ID or bookmark the profile link below
              </p>
            </div>

            {/* QR Code Section */}
            {qrCodeUrl && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Your QR Code</h2>
                <div className="flex justify-center mb-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="Profile QR Code" 
                    className="border-2 border-gray-300 rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Scan this QR code to quickly access your emergency profile
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = `medlink-profile-${response.publicId}.png`;
                      link.href = qrCodeUrl;
                      link.click();
                    }}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-purple-700 transition-colors text-sm"
                  >
                    Download QR Code
                  </button>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-center font-semibold hover:bg-gray-700 transition-colors text-sm"
                  >
                    Print QR Code
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <Link 
                href={`/view/${response.publicId}`}
                className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition-colors"
              >
                View Your Profile
              </Link>
              
              <button
                onClick={() => {
                  const url = `${window.location.origin}/view/${response.publicId}`;
                  navigator.clipboard.writeText(url);
                  alert('Profile URL copied to clipboard!');
                }}
                className="block w-full bg-green-600 text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition-colors"
              >
                Copy Profile URL
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Next Steps:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Download and print your QR code
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Keep the printed QR code in your wallet or purse
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Save the profile URL on your phone's home screen
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Consider wearing a medical ID bracelet with the QR code
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Share the profile ID with close family members
                </li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Emergency Profile</h1>
            <p className="text-gray-600">Fill in your medical information for emergency situations</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                value={profile.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type *</label>
              <select
                name="bloodType"
                required
                value={profile.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
              <textarea
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List any allergies (medications, foods, environmental, etc.)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                name="medicalConditions"
                value={profile.medicalConditions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List any chronic conditions, medications, or important medical history"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name *</label>
              <input
                type="text"
                name="emergencyContactName"
                required
                value={profile.emergencyContactName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter emergency contact name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Phone *</label>
              <input
                type="tel"
                name="emergencyContactPhone"
                required
                value={profile.emergencyContactPhone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number with country code"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Profile...' : 'Create Emergency Profile'}
              </button>
              
              <Link
                href="/"
                className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Your information will be stored securely and only accessible via your unique profile ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
