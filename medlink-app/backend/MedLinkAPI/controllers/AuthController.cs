using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using MedLinkAPI.Data;
using MedLinkAPI.Models;
using MedLinkAPI.Models.DTOs;
using MedLinkAPI.Services;
using System.Security.Claims;

namespace MedLinkAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(AppDbContext context, IJwtService jwtService, ILogger<AuthController> logger)
        {
            _context = context;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return Unauthorized("Invalid email or password");
                }

                if (!user.IsActive)
                {
                    return Unauthorized("Account is deactivated");
                }

                // Check if doctor is approved
                if (user.Role == UserRole.Doctor && user.DoctorStatus != DoctorStatus.Approved)
                {
                    return Unauthorized("Doctor account is not approved yet");
                }

                // Update last login
                user.LastLoginAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                var token = _jwtService.GenerateToken(user);
                var userDto = MapToUserDto(user);

                _logger.LogInformation($"User {user.Email} logged in successfully");

                return Ok(new AuthResponseDto
                {
                    Token = token,
                    User = userDto
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register([FromBody] RegisterUserDto registerDto)
        {
            try
            {
                // Check if user already exists
                if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                {
                    return BadRequest("User with this email already exists");
                }

                var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

                var user = new User
                {
                    Email = registerDto.Email,
                    PasswordHash = passwordHash,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.PhoneNumber,
                    Role = UserRole.User,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                var token = _jwtService.GenerateToken(user);
                var userDto = MapToUserDto(user);

                _logger.LogInformation($"New user registered: {user.Email}");

                return Ok(new AuthResponseDto
                {
                    Token = token,
                    User = userDto
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register-doctor")]
        public async Task<ActionResult> RegisterDoctor([FromBody] RegisterDoctorDto registerDto)
        {
            try
            {
                // Check if user already exists
                if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                {
                    return BadRequest("User with this email already exists");
                }

                // Check if license number is already registered
                if (await _context.Users.AnyAsync(u => u.DoctorLicenseNumber == registerDto.DoctorLicenseNumber))
                {
                    return BadRequest("Doctor with this license number already exists");
                }

                var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

                var doctor = new User
                {
                    Email = registerDto.Email,
                    PasswordHash = passwordHash,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.PhoneNumber,
                    Role = UserRole.Doctor,
                    DoctorLicenseNumber = registerDto.DoctorLicenseNumber,
                    MedicalInstitution = registerDto.MedicalInstitution,
                    Specialization = registerDto.Specialization,
                    DoctorVerificationDocuments = registerDto.VerificationDocuments,
                    DoctorStatus = DoctorStatus.Pending,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(doctor);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"New doctor registration pending approval: {doctor.Email}");

                return Ok(new { 
                    message = "Doctor registration submitted successfully. Your account will be reviewed by an administrator.",
                    doctorId = doctor.Id
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during doctor registration");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized();
                }

                var user = await _context.Users.FindAsync(int.Parse(userId));
                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(MapToUserDto(user));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting current user");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("pending-doctors")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<PendingDoctorDto>>> GetPendingDoctors()
        {
            try
            {
                var pendingDoctors = await _context.Users
                    .Where(u => u.Role == UserRole.Doctor && u.DoctorStatus == DoctorStatus.Pending)
                    .Select(u => new PendingDoctorDto
                    {
                        Id = u.Id,
                        Email = u.Email,
                        FirstName = u.FirstName,
                        LastName = u.LastName,
                        DoctorLicenseNumber = u.DoctorLicenseNumber!,
                        MedicalInstitution = u.MedicalInstitution!,
                        Specialization = u.Specialization!,
                        CreatedAt = u.CreatedAt,
                        VerificationDocuments = u.DoctorVerificationDocuments
                    })
                    .ToListAsync();

                return Ok(pendingDoctors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting pending doctors");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("approve-doctor")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> ApproveDoctor([FromBody] DoctorApprovalDto approvalDto)
        {
            try
            {
                var doctor = await _context.Users.FindAsync(approvalDto.DoctorId);
                if (doctor == null || doctor.Role != UserRole.Doctor)
                {
                    return NotFound("Doctor not found");
                }

                var adminId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                doctor.DoctorStatus = approvalDto.Status;
                if (approvalDto.Status == DoctorStatus.Approved)
                {
                    doctor.DoctorApprovedAt = DateTime.UtcNow;
                    doctor.ApprovedByAdminId = adminId;
                }

                await _context.SaveChangesAsync();

                _logger.LogInformation($"Doctor {doctor.Email} status updated to {approvalDto.Status} by admin {adminId}");

                return Ok(new { 
                    message = $"Doctor status updated to {approvalDto.Status}",
                    doctor = MapToUserDto(doctor)
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating doctor status");
                return StatusCode(500, "Internal server error");
            }
        }

        private static UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                CreatedAt = user.CreatedAt,
                LastLoginAt = user.LastLoginAt,
                IsActive = user.IsActive,
                DoctorLicenseNumber = user.DoctorLicenseNumber,
                MedicalInstitution = user.MedicalInstitution,
                Specialization = user.Specialization,
                DoctorStatus = user.DoctorStatus,
                DoctorApprovedAt = user.DoctorApprovedAt
            };
        }
    }
}
