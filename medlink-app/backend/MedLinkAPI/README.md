# API Testing Guide

Your MedLink API is now running at: **http://localhost:5079**

## Current Configuration:
- ✅ **Development**: Uses **In-Memory Database** (data resets on restart)
- ✅ **Production**: Ready for **SQL Server** connection
- ✅ Entity Framework Core configured
- ✅ API Controllers working
- ✅ Swagger documentation available

## API Endpoints:

### 1. Create Emergency Profile
**POST** `/api/EmergencyProfile`
```json
{
  "fullName": "John Doe",
  "bloodType": "O+",
  "allergies": "Peanuts, Shellfish",
  "medicalConditions": "Diabetes",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "+1-555-0123"
}
```

### 2. Get Emergency Profile by Public ID
**GET** `/api/EmergencyProfile/{publicId}`

## To Switch to SQL Server:

1. **Install SQL Server LocalDB** (recommended for development):
   - Download from: https://go.microsoft.com/fwlink/?linkid=866662
   - Or install via Visual Studio Installer

2. **Update appsettings.json** with your SQL Server connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=MedLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
}
```

3. **Update Program.cs** to always use SQL Server:
```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

4. **Run migrations**:
```bash
dotnet ef database update
```

## Testing the API:
Visit: http://localhost:5079/swagger to test the API endpoints directly in your browser.
