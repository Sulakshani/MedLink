using System.ComponentModel.DataAnnotations;

namespace MedLinkAPI.Models
{
    public enum UserRole
    {
        User = 0,    // Patient
        Doctor = 1,
        Admin = 2
    }

    public enum DoctorStatus
    {
        Pending = 0,
        Approved = 1,
        Rejected = 2,
        Suspended = 3
    }

    public class User
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        [Required]
        public required string FirstName { get; set; }

        [Required]
        public required string LastName { get; set; }

        public string? PhoneNumber { get; set; }

        [Required]
        public UserRole Role { get; set; } = UserRole.User;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Doctor-specific fields
        public string? DoctorLicenseNumber { get; set; }
        public string? MedicalInstitution { get; set; }
        public string? Specialization { get; set; }
        public DoctorStatus? DoctorStatus { get; set; }
        public string? DoctorVerificationDocuments { get; set; } // JSON string for document paths
        public DateTime? DoctorApprovedAt { get; set; }
        public int? ApprovedByAdminId { get; set; }

        // Navigation properties
        public List<EmergencyProfile> CreatedProfiles { get; set; } = new();
    }
}
