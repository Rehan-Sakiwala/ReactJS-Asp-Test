# Employee Management Frontend

A modern, responsive React frontend for the Employee Management CRUD API.

## Features

- ✨ **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🔍 **Search Functionality** - Search employees by name or email
- ➕ **Add Employees** - Modal form for adding new employees
- ✏️ **Edit Employees** - Inline editing with pre-filled forms
- 🗑️ **Delete Employees** - Confirmation dialog for safe deletion
- 📱 **Mobile Responsive** - Works perfectly on all device sizes
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## Tech Stack

- **React 19** - Latest React with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with gradients and animations

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## API Integration

The frontend connects to your .NET Web API at:
- **Base URL**: `https://localhost:7001/api/Employees`
- **Endpoints**:
  - `GET /` - Get all employees
  - `POST /` - Add new employee
  - `PUT /{id}` - Update employee
  - `DELETE /{id}` - Delete employee

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Component-specific styles
├── main.jsx         # Application entry point
└── index.css        # Global styles and utilities
```

## Usage

1. **View Employees**: The main page displays all employees in a clean table format
2. **Search**: Use the search bar to filter employees by name or email
3. **Add Employee**: Click "Add Employee" button to open the form modal
4. **Edit Employee**: Click the "Edit" button on any employee row
5. **Delete Employee**: Click "Delete" button and confirm the action

## Styling

The application uses a custom CSS framework with:
- Modern color palette with gradients
- Responsive design patterns
- Smooth transitions and hover effects
- Mobile-first approach
- Accessible design principles
