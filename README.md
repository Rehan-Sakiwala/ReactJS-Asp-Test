### TestCRUD — React + ASP.NET Core + SQL Server

An Employee Management CRUD app with a React (Vite) frontend, ASP.NET Core Web API backend, and SQL Server database.

## Prerequisites

- **.NET SDK 8.0+**
- **Node.js 18+** and **npm**
- **SQL Server (Express/LocalDB/Developer)**

## Project Structure

```
TestCRUD.sln
├─ TestCRUD/                 # ASP.NET Core Web API
│  ├─ Controllers/EmployeesController.cs
│  ├─ Data/ApplicationDBContext.cs
│  ├─ Models/
│  ├─ Migrations/
│  ├─ Program.cs
│  └─ appsettings.json
└─ client/                   # React (Vite) frontend
   └─ src/
```

## Quick Start

1) Configure database connection in `TestCRUD/appsettings.json` → `ConnectionStrings:DefaultConnection`.

2) Apply EF Core migrations (first run creates DB and tables):
```bash
cd TestCRUD
dotnet restore
dotnet ef database update
```

3) Run the backend (serves Swagger):
```bash
dotnet run
```
Default URLs: `https://localhost:7276` and `http://localhost:5202`.

4) Run the frontend in another terminal:
```bash
cd client
npm install
npm run dev
```
Frontend URL: `http://localhost:5173`.


## API Overview

Base: `https://localhost:7276/api/Employees`

- `GET /` — List employees
- `GET /{id}` — Get employee by id (GUID)
- `POST /` — Create employee (body: `Name, Email, Phone, Salary`)
- `PUT /{id}` — Update employee
- `DELETE /{id}` — Delete employee