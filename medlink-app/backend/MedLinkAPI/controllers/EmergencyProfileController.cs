using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedLinkAPI.Data;
using MedLinkAPI.Models;

namespace MedLinkAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmergencyProfileController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<EmergencyProfileController> _logger;

    public EmergencyProfileController(AppDbContext context, ILogger<EmergencyProfileController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateEmergencyProfileDto dto)
    {
        _logger.LogInformation("Creating new emergency profile for: {FullName}", dto.FullName);
        
        var profile = new EmergencyProfile
        {
            FullName = dto.FullName,
            BloodType = dto.BloodType,
            Allergies = dto.Allergies,
            MedicalConditions = dto.MedicalConditions,
            EmergencyContactName = dto.EmergencyContactName,
            EmergencyContactPhone = dto.EmergencyContactPhone,
            PublicId = Guid.NewGuid().ToString().Substring(0, 8)
        };
        
        _context.EmergencyProfiles.Add(profile);
        var saveResult = await _context.SaveChangesAsync();
        
        _logger.LogInformation("Saved emergency profile. Changes saved: {Count}, Profile ID: {Id}, Public ID: {PublicId}", 
            saveResult, profile.Id, profile.PublicId);
        
        return Ok(profile);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        _logger.LogInformation("Getting all emergency profiles");
        
        var profiles = await _context.EmergencyProfiles.ToListAsync();
        _logger.LogInformation("Found {Count} profiles in database", profiles.Count);
        
        return Ok(profiles.Select(p => new
        {
            p.Id,
            p.PublicId,
            p.FullName,
            p.BloodType,
            p.Allergies,
            p.MedicalConditions,
            p.EmergencyContactName,
            p.EmergencyContactPhone
        }));
    }

    [HttpGet("admin/database-info")]
    public async Task<IActionResult> GetDatabaseInfo()
    {
        _logger.LogInformation("Getting database information");
        
        var profiles = await _context.EmergencyProfiles.ToListAsync();
        var count = profiles.Count;
        
        return Ok(new
        {
            TotalProfiles = count,
            DatabaseType = "In-Memory",
            Profiles = profiles.Select(p => new
            {
                p.Id,
                p.PublicId,
                p.FullName,
                p.BloodType,
                CreatedAt = "N/A (In-Memory DB doesn't track creation time)"
            }).ToList()
        });
    }

    [HttpGet("{publicId}")]
    public async Task<IActionResult> GetByPublicId(string publicId)
    {
        _logger.LogInformation("Searching for emergency profile with Public ID: {PublicId}", publicId);
        
        // First, let's see how many profiles are in the database
        var totalCount = await _context.EmergencyProfiles.CountAsync();
        _logger.LogInformation("Total profiles in database: {Count}", totalCount);
        
        var profile = await _context.EmergencyProfiles
            .FirstOrDefaultAsync(p => p.PublicId == publicId);

        if (profile == null) 
        {
            _logger.LogWarning("Profile not found with Public ID: {PublicId}", publicId);
            return NotFound();
        }

        _logger.LogInformation("Found profile: {FullName} with ID: {Id}", profile.FullName, profile.Id);

        return Ok(new
        {
            profile.FullName,
            profile.BloodType,
            profile.Allergies,
            profile.MedicalConditions,
            profile.EmergencyContactName,
            profile.EmergencyContactPhone
        });
    }
}
