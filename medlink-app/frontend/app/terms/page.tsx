import Link from 'next/link';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
              <span className="ml-2 text-sm text-gray-500">Terms of Service</span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using MedLink ("the Service"), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Medical Emergency Disclaimer</h3>
                <p className="text-red-700">
                  <strong>MedLink is NOT a substitute for professional medical care or emergency services.</strong> 
                  In case of a medical emergency, always call your local emergency number (911 in the US) 
                  immediately. MedLink is designed to supplement, not replace, emergency medical response.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-700 mb-4">
                MedLink provides a platform for storing and accessing emergency medical information 
                through QR codes. The service allows users to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Create digital emergency medical profiles</li>
                <li>Generate QR codes for quick access to medical information</li>
                <li>Enable healthcare providers to access critical medical data during emergencies</li>
                <li>Maintain and update personal medical information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Accurate Information</h3>
              <p className="text-gray-700 mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Provide accurate, current, and complete medical information</li>
                <li>Update your profile promptly when medical information changes</li>
                <li>Ensure emergency contact information is current and accurate</li>
                <li>Verify that all medical data entered is correct to the best of your knowledge</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Proper Use</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Use the service only for legitimate emergency medical information purposes</li>
                <li>Not create profiles for other individuals without their explicit consent</li>
                <li>Not share your profile access credentials with unauthorized persons</li>
                <li>Report any unauthorized access to your profile immediately</li>
                <li>Keep your QR code secure and only share it with appropriate parties</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Prohibited Activities</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Using false or misleading medical information</li>
                <li>Attempting to access other users' profiles without authorization</li>
                <li>Using the service for any illegal or unauthorized purpose</li>
                <li>Interfering with or disrupting the service or servers</li>
                <li>Transmitting any harmful or malicious code</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Information Accuracy</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ Critical Accuracy Notice</h3>
                <p className="text-yellow-700">
                  The accuracy of your medical information could be life-critical in an emergency. 
                  You are solely responsible for ensuring all information in your profile is accurate, 
                  current, and complete. Inaccurate information could lead to inappropriate medical 
                  treatment or delayed care.
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>MedLink does not verify the accuracy of medical information you provide</li>
                <li>Healthcare providers will rely on the information you've entered</li>
                <li>You should consult with healthcare professionals before entering complex medical data</li>
                <li>Regular updates are essential as your medical situation changes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Healthcare Provider Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Authorized Access</h3>
              <p className="text-gray-700 mb-4">
                Healthcare providers and emergency responders may access your profile during 
                emergency situations. By using MedLink, you consent to this access when:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>You are unable to provide medical information due to your condition</li>
                <li>A medical emergency requires immediate access to your medical history</li>
                <li>Healthcare providers need critical information to make treatment decisions</li>
                <li>Emergency responders require medication or allergy information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Responsibility</h3>
              <p className="text-gray-700 mb-4">
                Healthcare providers using MedLink are expected to:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Use the service only for legitimate medical purposes</li>
                <li>Verify critical information when possible</li>
                <li>Maintain patient confidentiality</li>
                <li>Report any suspected misuse of the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">📱 Backup Plans</h3>
                <p className="text-blue-700">
                  Technology can fail. Always maintain physical backup copies of critical medical 
                  information (wallet cards, medical alert bracelets, etc.) in addition to using MedLink.
                </p>
              </div>

              <p className="text-gray-700 mb-4">
                While we strive for 99.9% uptime, MedLink may experience:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Scheduled maintenance downtime</li>
                <li>Temporary service interruptions</li>
                <li>Network connectivity issues</li>
                <li>Emergency system maintenance</li>
              </ul>

              <p className="text-gray-700 mb-4">
                We are not liable for any consequences resulting from service unavailability, 
                including but not limited to delayed medical care or treatment decisions made 
                without access to your profile.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations of Liability</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Limitations</h3>
              <p className="text-gray-700 mb-4">
                MedLink is provided "as is" without warranty of any kind. We specifically disclaim:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Responsibility for medical decisions made based on profile information</li>
                <li>Liability for inaccurate or outdated user-provided information</li>
                <li>Guarantees of service availability during emergencies</li>
                <li>Responsibility for third-party access to or use of your information</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Maximum Liability</h3>
              <p className="text-gray-700 mb-4">
                In no event shall MedLink's total liability exceed the amount paid by you for 
                the service in the 12 months preceding the incident. This limitation applies 
                to all claims, regardless of whether they arise from contract, tort, or any other theory.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless MedLink from any claims, damages, or 
                expenses arising from:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your use of the service</li>
                <li>Information you provide in your profile</li>
                <li>Your violation of these terms</li>
                <li>Your violation of any third party's rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection and Privacy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your 
                personal information is governed by our Privacy Policy, which is incorporated 
                into these terms by reference.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700">
                  📋 <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                    View our complete Privacy Policy
                  </Link>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Voluntary Termination</h3>
              <p className="text-gray-700 mb-4">
                You may delete your account and profile at any time through the service interface. 
                Upon deletion:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Your profile information will be permanently removed</li>
                <li>Your QR codes will become inactive</li>
                <li>Access logs may be retained for security purposes</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Involuntary Termination</h3>
              <p className="text-gray-700 mb-4">
                We may suspend or terminate your account if you:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Violate these terms of service</li>
                <li>Provide false or misleading information</li>
                <li>Engage in unauthorized access attempts</li>
                <li>Use the service for illegal purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms shall be governed by and construed in accordance with the laws of 
                [Jurisdiction], without regard to its conflict of law provisions. Any disputes 
                arising under these terms shall be subject to the exclusive jurisdiction of the 
                courts of [Jurisdiction].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the service. Your continued use of MedLink after 
                changes are posted constitutes your acceptance of the modified terms.
              </p>
              
              <p className="text-gray-700 mb-4">
                For material changes that affect your rights or responsibilities, we will provide 
                notice through the service or via email when possible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these terms is found to be invalid or unenforceable, 
                the remaining provisions will remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@medlink.health</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> 1-800-MEDLINK</p>
                <p className="text-gray-700 mb-2"><strong>Mail:</strong> MedLink Legal Department</p>
                <p className="text-gray-700 ml-6">123 Healthcare Drive</p>
                <p className="text-gray-700 ml-6">Medical City, MC 12345</p>
              </div>
            </section>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Agreement Acknowledgment</h3>
              <p className="text-green-700">
                By creating a profile or using MedLink in any way, you acknowledge that you have 
                read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
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
