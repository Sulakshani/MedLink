using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MedLinkAPI.Data;
using MedLinkAPI.Models;
using System.Security.Claims;

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
    [Authorize]
    public async Task<IActionResult> Create(CreateEmergencyProfileDto dto)
    {
        _logger.LogInformation("Creating new emergency profile for: {FullName}", dto.FullName);
        
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        
        var profile = new EmergencyProfile
        {
            FullName = dto.FullName,
            BloodType = dto.BloodType,
            Allergies = dto.Allergies,
            MedicalConditions = dto.MedicalConditions,
            Medications = dto.Medications,
            EmergencyContactName = dto.EmergencyContactName,
            EmergencyContactPhone = dto.EmergencyContactPhone,
            PhysicianName = dto.PhysicianName,
            PhysicianPhone = dto.PhysicianPhone,
            PublicId = Guid.NewGuid().ToString().Substring(0, 8),
            CreatedBy = userId
        };
        
        _context.EmergencyProfiles.Add(profile);
        var saveResult = await _context.SaveChangesAsync();
        
        _logger.LogInformation("Saved emergency profile. Changes saved: {Count}, Profile ID: {Id}, Public ID: {PublicId}", 
            saveResult, profile.Id, profile.PublicId);
        
        return Ok(profile);
    }

    [HttpGet]
    [Authorize(Roles = "Doctor,Admin")]
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
            p.Medications,
            p.EmergencyContactName,
            p.EmergencyContactPhone,
            p.PhysicianName,
            p.PhysicianPhone
        }));
    }

    [HttpGet("my-profiles")]
    [Authorize]
    public async Task<IActionResult> GetMyProfiles()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        _logger.LogInformation("Getting profiles for user: {UserId}", userId);
        
        var profiles = await _context.EmergencyProfiles
            .Where(p => p.CreatedBy == userId)
            .ToListAsync();
        
        return Ok(profiles.Select(p => new
        {
            p.Id,
            p.PublicId,
            p.FullName,
            p.BloodType,
            p.Allergies,
            p.MedicalConditions,
            p.Medications,
            p.EmergencyContactName,
            p.EmergencyContactPhone,
            p.PhysicianName,
            p.PhysicianPhone
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
