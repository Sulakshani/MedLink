# SQL Server Connection String Options

## Option 1: SQL Server LocalDB (if you install it)
```json
"DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=MedLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true"
```

## Option 2: SQL Server Express (if installed)
```json
"DefaultConnection": "Server=.\\SQLEXPRESS;Database=MedLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true"
```

## Option 3: Full SQL Server Instance
```json
"DefaultConnection": "Server=localhost;Database=MedLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true"
```

## Option 4: SQL Server with username/password
```json
"DefaultConnection": "Server=localhost;Database=MedLinkDB;User Id=your_username;Password=your_password;MultipleActiveResultSets=true"
```

## Option 5: Azure SQL Database
```json
"DefaultConnection": "Server=tcp:your-server.database.windows.net,1433;Initial Catalog=MedLinkDB;Persist Security Info=False;User ID=your_username;Password=your_password;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
```

## How to install SQL Server LocalDB:
1. Download from: https://go.microsoft.com/fwlink/?linkid=866662
2. Or use Visual Studio Installer to add "SQL Server Express LocalDB"
3. Or use the SQL Server Express installer
