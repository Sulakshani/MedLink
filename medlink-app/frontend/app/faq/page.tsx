import Link from 'next/link';

export default function FAQ() {
  const faqs = [
    {
      question: "What is MedLink?",
      answer: "MedLink is an emergency medical information platform that allows you to store critical medical information in a digital profile accessible via QR code. In emergency situations, healthcare providers can quickly scan your QR code to access vital information like allergies, medications, and emergency contacts."
    },
    {
      question: "How does the QR code work?",
      answer: "Each profile generates a unique QR code that links to your medical information. When scanned, it takes the user directly to your emergency profile page where healthcare providers can view your medical details. The QR code can be printed and carried in your wallet, worn on a medical ID bracelet, or saved on your phone."
    },
    {
      question: "Is my medical information secure?",
      answer: "Yes, we take security very seriously. All data is encrypted both in transit and at rest. Your profile is only accessible via the unique QR code or profile ID, and we maintain detailed access logs. We comply with healthcare privacy regulations including HIPAA principles."
    },
    {
      question: "Who can access my profile?",
      answer: "Your profile can be accessed by anyone who has your QR code or profile ID. This is intentional for emergency situations where you may be unconscious or unable to provide medical information. We recommend only sharing this information with trusted individuals and healthcare providers."
    },
    {
      question: "Can I update my profile after creating it?",
      answer: "Currently, profiles cannot be edited after creation to maintain data integrity for emergency use. If you need to update your information, you would need to create a new profile. We're working on secure profile editing features for future releases."
    },
    {
      question: "What information should I include?",
      answer: "Include critical medical information that would be important in an emergency: allergies (especially drug allergies), current medications, medical conditions, blood type, emergency contact information, and healthcare provider details. Only include information you're comfortable sharing with emergency responders."
    },
    {
      question: "Is there a cost to use MedLink?",
      answer: "MedLink is currently free to use. Our mission is to help save lives by making emergency medical information readily accessible. We may introduce premium features in the future, but basic emergency profile access will always remain free."
    },
    {
      question: "What if I lose my QR code?",
      answer: "If you lose your QR code but remember your profile ID, you can still access your profile by going to medlink.health/view/[your-profile-id]. We recommend saving your profile ID in a secure location and sharing it with trusted family members."
    },
    {
      question: "Can I create profiles for family members?",
      answer: "Yes, you can create profiles for family members, especially children or elderly relatives who may not be able to create their own. However, you should only include information with their consent and ensure they're aware of what information is being shared."
    },
    {
      question: "Does MedLink work internationally?",
      answer: "Yes, MedLink profiles can be accessed from anywhere with an internet connection. However, healthcare practices and systems vary by country. We recommend also carrying traditional medical identification when traveling internationally."
    },
    {
      question: "What if I'm in an area with no internet?",
      answer: "MedLink requires an internet connection to access profiles. This is why we always recommend having backup medical identification (like a traditional medical alert bracelet or wallet card) in addition to your QR code."
    },
    {
      question: "How do I know if someone accessed my profile?",
      answer: "While we maintain access logs for security purposes, we don't currently send real-time notifications when profiles are accessed. This is to avoid creating alerts during genuine emergency situations when you may not be able to respond."
    },
    {
      question: "Can healthcare providers verify the information?",
      answer: "Healthcare providers should use MedLink information as a starting point and verify critical details when possible. We provide disclaimers on each profile that the information is user-provided and should be confirmed with official medical records when circumstances allow."
    },
    {
      question: "What happens to my data if I die?",
      answer: "Currently, profiles remain active indefinitely. We're developing policies for handling deceased users' data, including options for family members to request profile removal or memorial status. This is an evolving area as we balance respect for the deceased with potential ongoing medical needs for families."
    },
    {
      question: "Is MedLink a substitute for calling emergency services?",
      answer: "No, absolutely not. MedLink is designed to supplement emergency medical care, not replace it. Always call your local emergency number (911 in the US) first in any medical emergency. MedLink helps provide additional information to first responders and healthcare providers."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
              <span className="ml-2 text-sm text-gray-500">FAQ</span>
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
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MedLink
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-bold text-blue-800 mb-2">Still have questions?</h3>
          <p className="text-blue-700 mb-4">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Support →
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
