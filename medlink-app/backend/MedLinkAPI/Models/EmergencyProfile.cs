namespace MedLinkAPI.Models;

public class EmergencyProfile
{
    public int Id { get; set; }
    public required string FullName { get; set; }
    public required string BloodType { get; set; }
    public required string Allergies { get; set; }
    public required string MedicalConditions { get; set; }
    public string? Medications { get; set; }
    public required string EmergencyContactName { get; set; }
    public required string EmergencyContactPhone { get; set; }
    public string? PhysicianName { get; set; }
    public string? PhysicianPhone { get; set; }
    public required string PublicId { get; set; }  // Used for QR lookup
    public int CreatedBy { get; set; }  // Foreign key to User
    
    // Navigation property
    public User? Creator { get; set; }
}
