'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '../../../lib/auth';

interface EmergencyProfileData {
  fullName: string;
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export default function ViewProfile() {
  const params = useParams();
  const publicId = params.publicId as string;
  const [data, setData] = useState<EmergencyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (publicId) {
      setLoading(true);
      api.get(`/emergencyprofile/${publicId}`)
        .then((res: any) => {
          setData(res.data);
          setError('');
        })
        .catch(() => {
          setError("Profile not found");
          setData(null);
        })
        .finally(() => setLoading(false));
    }
  }, [publicId]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Emergency Profile</h1>
            <p className="text-sm text-gray-500 mt-1">ID: {publicId}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-red-50 rounded-lg">
              <div className="text-red-600 text-2xl mr-4">👤</div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="text-lg font-semibold text-gray-900">{data.fullName}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="text-red-600 text-2xl mr-4">🩸</div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                <p className="text-lg font-semibold text-gray-900">{data.bloodType}</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <div className="text-yellow-600 text-2xl mr-4 mt-1">⚠️</div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <p className="text-lg text-gray-900">{data.allergies}</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 text-2xl mr-4 mt-1">🏥</div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                <p className="text-lg text-gray-900">{data.medicalConditions}</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 text-2xl mr-4 mt-1">📞</div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                <p className="text-lg font-semibold text-gray-900">{data.emergencyContactName}</p>
                <p className="text-lg text-blue-600 font-mono">{data.emergencyContactPhone}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              This information is for emergency use only. Please handle with care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
