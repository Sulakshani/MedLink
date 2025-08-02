import Link from 'next/link';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
              <span className="ml-2 text-sm text-gray-500">Privacy Policy</span>
            </div>
            <nav className="flex space-x-8">
              <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                Create Profile
              </Link>
              <Link href="/scanner" className="text-gray-700 hover:text-blue-600 transition-colors">
                Scan QR Code
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
              <p className="text-gray-700 mb-4">
                At MedLink, we understand that your medical information is among the most sensitive data you possess. 
                We are committed to protecting your privacy and ensuring that your emergency medical information 
                remains secure and is only accessed when necessary for emergency medical care.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Emergency Medical Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Full name</li>
                <li>Emergency contact information</li>
                <li>Medical conditions and allergies</li>
                <li>Current medications</li>
                <li>Blood type and other vital medical data</li>
                <li>Healthcare provider information</li>
                <li>Insurance information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Profile access logs (when and from where your profile was accessed)</li>
                <li>Device information for security purposes</li>
                <li>IP addresses for fraud prevention</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Primary Purpose: Emergency Medical Care</h3>
              <p className="text-gray-700 mb-4">
                Your information is primarily used to provide critical medical information to healthcare 
                professionals during emergency situations. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Displaying your medical profile to authorized medical personnel</li>
                <li>Enabling emergency responders to make informed treatment decisions</li>
                <li>Facilitating contact with your emergency contacts</li>
                <li>Coordinating with your healthcare providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security and Service Improvement</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Monitoring for unauthorized access attempts</li>
                <li>Improving the reliability and accessibility of our service</li>
                <li>Ensuring compliance with healthcare regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Situations</h3>
                <p className="text-red-700">
                  Your medical information may be accessed by healthcare professionals and emergency 
                  responders during medical emergencies without your explicit consent, as this access 
                  is necessary to provide you with potentially life-saving medical care.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Authorized Sharing</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Licensed healthcare providers treating you in emergency situations</li>
                <li>Emergency medical services (EMS) personnel</li>
                <li>Hospital emergency departments</li>
                <li>Your designated emergency contacts (contact information only)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">We Do NOT Share Information For</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Marketing or advertising purposes</li>
                <li>Commercial gain</li>
                <li>Non-emergency medical research</li>
                <li>Insurance discrimination</li>
                <li>Employment screening</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Safeguards</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>End-to-end encryption for all data transmission</li>
                <li>Encrypted data storage with industry-standard security measures</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for profile management</li>
                <li>Secure QR code generation with unique, non-guessable identifiers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Controls</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Strict access logging and monitoring</li>
                <li>Time-limited access sessions</li>
                <li>Verification of healthcare provider credentials where possible</li>
                <li>Immediate notification of profile access attempts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Control Rights</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li><strong>Access:</strong> View all information stored in your profile</li>
                <li><strong>Update:</strong> Modify or correct your medical information at any time</li>
                <li><strong>Delete:</strong> Remove your profile and all associated data</li>
                <li><strong>Export:</strong> Download a copy of your profile data</li>
                <li><strong>Access History:</strong> View logs of when and by whom your profile was accessed</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Privacy Settings</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Control which information fields are visible to emergency responders</li>
                <li>Set preferences for emergency contact notification</li>
                <li>Configure access alerting preferences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">HIPAA Compliance</h2>
              <p className="text-gray-700 mb-4">
                While MedLink is designed to facilitate emergency medical care, we are committed to 
                adhering to HIPAA (Health Insurance Portability and Accountability Act) principles 
                and other applicable healthcare privacy regulations. We implement appropriate 
                administrative, physical, and technical safeguards to protect your health information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Users</h2>
              <p className="text-gray-700 mb-4">
                For users outside the United States, we comply with applicable local data protection 
                laws including GDPR for European users. Your data rights may vary based on your 
                jurisdiction, and we will honor these rights as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                MedLink profiles for children under 18 may be created and managed by parents or legal 
                guardians. We do not knowingly collect personal information from children under 13 
                without verifiable parental consent. Parents and guardians have full control over 
                their children's profiles and can modify or delete them at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices, 
                technology, or legal requirements. We will notify you of any material changes by 
                updating the "Last updated" date and, when appropriate, providing additional notice 
                through our service or via email.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or your data rights, please contact us:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@medlink.health</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> 1-800-MEDLINK</p>
                <p className="text-gray-700 mb-2"><strong>Mail:</strong> MedLink Privacy Officer</p>
                <p className="text-gray-700 ml-6">123 Healthcare Drive</p>
                <p className="text-gray-700 ml-6">Medical City, MC 12345</p>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
