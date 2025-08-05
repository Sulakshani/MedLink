using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MedLinkAPI.Models;

namespace MedLinkAPI.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
        ClaimsPrincipal? ValidateToken(string token);
    }

    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
            _secretKey = _configuration["JwtSettings:SecretKey"] ?? "YourSuperSecretKeyThatShouldBeAtLeast32CharactersLongForSecurity";
            _issuer = _configuration["JwtSettings:Issuer"] ?? "MedLinkAPI";
            _audience = _configuration["JwtSettings:Audience"] ?? "MedLinkApp";
        }

        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email),
                new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new(ClaimTypes.Role, user.Role.ToString()),
                new("firstName", user.FirstName),
                new("lastName", user.LastName)
            };

            // Add doctor-specific claims if user is a doctor
            if (user.Role == UserRole.Doctor)
            {
                claims.Add(new("doctorStatus", user.DoctorStatus?.ToString() ?? "Pending"));
                if (!string.IsNullOrEmpty(user.DoctorLicenseNumber))
                    claims.Add(new("licenseNumber", user.DoctorLicenseNumber));
                if (!string.IsNullOrEmpty(user.Specialization))
                    claims.Add(new("specialization", user.Specialization));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(int.Parse(_configuration["JwtSettings:ExpirationHours"] ?? "24")),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secretKey);

                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = _issuer,
                    ValidateAudience = true,
                    ValidAudience = _audience,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };

                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);
                return principal;
            }
            catch
            {
                return null;
            }
        }
    }
}
