'use client';

import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Doctor': return 'bg-green-100 text-green-800';
      case 'User': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Link href="/home" className="text-3xl font-bold text-gray-900">🏥 MedLink</Link>
                <span className="ml-2 text-sm text-gray-500">Emergency Medical Information</span>
              </div>
              <nav className="flex space-x-8">
                <Link href="/home" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/create" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Create Profile
                </Link>
                <Link href="/scanner" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Scanner
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getRoleColor(user?.role || '')}`}>
                  {user?.role}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                      <dd className="text-sm text-gray-900">{user?.firstName} {user?.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{user?.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                      <dd className="text-sm text-gray-900">{user?.phoneNumber || 'Not provided'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Account Created</dt>
                      <dd className="text-sm text-gray-900">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last Login</dt>
                      <dd className="text-sm text-gray-900">
                        {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {user?.role === 'Doctor' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                    <dl className="space-y-3">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">License Number</dt>
                        <dd className="text-sm text-gray-900">{user?.doctorLicenseNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Medical Institution</dt>
                        <dd className="text-sm text-gray-900">{user?.medicalInstitution}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Specialization</dt>
                        <dd className="text-sm text-gray-900">{user?.specialization}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Status</dt>
                        <dd>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user?.doctorStatus)}`}>
                            {user?.doctorStatus}
                          </span>
                        </dd>
                      </div>
                      {user?.doctorApprovedAt && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Approved Date</dt>
                          <dd className="text-sm text-gray-900">
                            {new Date(user.doctorApprovedAt).toLocaleDateString()}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>

              {user?.role === 'Doctor' && user?.doctorStatus === 'Pending' && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="text-sm text-yellow-800">
                    <strong>Account Pending Approval:</strong> Your doctor account is currently under review. 
                    You will be notified once an administrator approves your account.
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <Link
                    href="/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Create Emergency Profile
                  </Link>
                  <Link
                    href="/scanner"
                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Scan QR Code
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
