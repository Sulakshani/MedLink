using Microsoft.EntityFrameworkCore;
using MedLinkAPI.Models;

namespace MedLinkAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<EmergencyProfile> EmergencyProfiles { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure User entity
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.DoctorLicenseNumber).HasMaxLength(50);
            entity.Property(e => e.MedicalInstitution).HasMaxLength(200);
            entity.Property(e => e.Specialization).HasMaxLength(100);
        });

        // Configure relationship between User and EmergencyProfile
        modelBuilder.Entity<EmergencyProfile>(entity =>
        {
            entity.HasOne<User>()
                .WithMany(u => u.CreatedProfiles)
                .HasForeignKey("CreatedByUserId")
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Seed default admin user
        var adminPasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123");
        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Email = "admin@medlink.com",
            PasswordHash = adminPasswordHash,
            FirstName = "System",
            LastName = "Administrator",
            Role = UserRole.Admin,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });
    }
}
