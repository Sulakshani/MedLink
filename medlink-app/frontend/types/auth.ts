export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'User' | 'Doctor' | 'Admin';
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  doctorLicenseNumber?: string;
  medicalInstitution?: string;
  specialization?: string;
  doctorStatus?: 'Pending' | 'Approved' | 'Rejected' | 'Suspended';
  doctorApprovedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

export interface RegisterDoctorRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  doctorLicenseNumber: string;
  medicalInstitution: string;
  specialization: string;
  verificationDocuments?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
