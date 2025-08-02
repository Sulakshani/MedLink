'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
              <span className="ml-2 text-sm text-gray-500">Emergency Medical Information</span>
            </div>
            <nav className="flex space-x-8">
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create Profile
              </Link>
              <Link href="/about" className="text-blue-600 font-semibold">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About MedLink</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MedLink is an emergency medical information platform designed to provide instant access 
            to critical health information when it matters most.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                In emergency situations, every second counts. Medical professionals need immediate access 
                to critical patient information to provide the best possible care.
              </p>
              <p className="text-gray-600">
                MedLink bridges this gap by providing a secure, instant way to access emergency medical 
                information through QR codes, ensuring that vital health data is available when and where 
                it's needed most.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🚑</div>
              <p className="text-lg font-semibold text-gray-700">Saving Lives Through Technology</p>
            </div>
          </div>
        </div>

        {/* How It Helps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How MedLink Helps</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Patients</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  Peace of mind knowing medical information is accessible
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  Quick setup with easy-to-use interface
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  Portable solution that works on any smartphone
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  No need to remember complex medical details under stress
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Medical Professionals</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  Instant access to critical patient information
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  Reduces time spent gathering medical history
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  Access to allergy and medication information
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  Emergency contact details readily available
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Access information in under 3 seconds with QR code scanning</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is protected and only accessible via your unique QR code</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Universal Access</h3>
              <p className="text-gray-600">Works on any device with a camera and internet connection</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">When MedLink Makes a Difference</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                <span className="text-red-600 text-xl">🚨</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Room Visits</h3>
                <p className="text-gray-600">
                  When patients are unconscious or unable to communicate, medical staff can quickly access 
                  vital information about allergies, medical conditions, and emergency contacts.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                <span className="text-blue-600 text-xl">🚑</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ambulance Response</h3>
                <p className="text-gray-600">
                  Paramedics can access critical medical information en route to the hospital, 
                  allowing them to provide better pre-hospital care and prepare receiving facilities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                <span className="text-green-600 text-xl">✈️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Travel Emergencies</h3>
                <p className="text-gray-600">
                  When traveling abroad or in remote areas, language barriers can be overcome 
                  with instant access to medical information in a universally understood format.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Emergency Profile?</h2>
          <p className="text-xl mb-6">Join thousands of users who have already secured their medical information.</p>
          <Link 
            href="/create"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Create Your Profile Now
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">🏥 MedLink</h3>
            <p className="text-gray-400">Emergency Medical Information Platform</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
