namespace MedLinkAPI.Models;

public class CreateEmergencyProfileDto
{
    public string FullName { get; set; } = string.Empty;
    public string BloodType { get; set; } = string.Empty;
    public string Allergies { get; set; } = string.Empty;
    public string MedicalConditions { get; set; } = string.Empty;
    public string? Medications { get; set; }
    public string EmergencyContactName { get; set; } = string.Empty;
    public string EmergencyContactPhone { get; set; } = string.Empty;
    public string? PhysicianName { get; set; }
    public string? PhysicianPhone { get; set; }
}
