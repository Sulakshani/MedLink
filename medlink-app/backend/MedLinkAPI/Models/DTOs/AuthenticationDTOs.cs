using System.ComponentModel.DataAnnotations;
using MedLinkAPI.Models;

namespace MedLinkAPI.Models.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }

    public class RegisterUserDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        [MinLength(8)]
        public required string Password { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public string? PhoneNumber { get; set; }
    }

    public class RegisterDoctorDto : RegisterUserDto
    {
        [Required]
        public required string DoctorLicenseNumber { get; set; }

        [Required]
        public required string MedicalInstitution { get; set; }

        [Required]
        public required string Specialization { get; set; }

        public string? VerificationDocuments { get; set; }
    }

    public class AuthResponseDto
    {
        public required string Token { get; set; }
        public required UserDto User { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public UserRole Role { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; }

        // Doctor-specific fields
        public string? DoctorLicenseNumber { get; set; }
        public string? MedicalInstitution { get; set; }
        public string? Specialization { get; set; }
        public DoctorStatus? DoctorStatus { get; set; }
        public DateTime? DoctorApprovedAt { get; set; }
    }

    public class DoctorApprovalDto
    {
        [Required]
        public int DoctorId { get; set; }

        [Required]
        public DoctorStatus Status { get; set; }

        public string? Notes { get; set; }
    }

    public class PendingDoctorDto
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required string DoctorLicenseNumber { get; set; }
        public required string MedicalInstitution { get; set; }
        public required string Specialization { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? VerificationDocuments { get; set; }
    }
}
