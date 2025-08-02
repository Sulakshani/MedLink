using Microsoft.EntityFrameworkCore;
using MedLinkAPI.Models;

namespace MedLinkAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<EmergencyProfile> EmergencyProfiles { get; set; }
}
