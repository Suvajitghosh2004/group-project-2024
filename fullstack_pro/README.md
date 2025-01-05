# Fullstack Student-Teacher Job Application System

## Overview
This is a fullstack application designed to facilitate job application management between students and teachers. The system provides:
- Student registration and profile management
- Job posting and application tracking
- Teacher dashboard for managing jobs and applicants
- Secure authentication for both roles
- File upload capabilities using Cloudinary

## Features

### Backend Features
- RESTful API endpoints
- MongoDB database integration
- JWT-based authentication
- File upload handling with Cloudinary
- CRUD operations for:
  - Student profiles
  - Job postings
  - Application tracking

### Frontend Features
- Responsive UI with separate layouts for students and teachers
- Protected routes based on user roles
- Job application and tracking interface
- Profile management
- Real-time status updates

## Technology Stack
- **Frontend**: React.js, Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Cloudinary
- **Authentication**: JWT
- **Middleware**: Multer

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Cloudinary account

### Setup Instructions
1. Clone the repository
2. Install dependencies:
   ```bash
   cd fullstack_pro/backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create `.env` file in backend directory with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobapp
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory
   npm run dev
   ```

## API Documentation

### Authentication
- `POST /api/auth/student/register` - Student registration
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/teacher/register` - Teacher registration
- `POST /api/auth/teacher/login` - Teacher login

### Student Endpoints
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `GET /api/students/jobs` - Get available jobs
- `POST /api/students/jobs/apply` - Apply for a job

### Teacher Endpoints
- `POST /api/teachers/jobs` - Create new job
- `GET /api/teachers/jobs` - Get created jobs
- `GET /api/teachers/jobs/:id/applicants` - Get job applicants

## Configuration
- Backend configuration in `backend/.env`
- Frontend API base URL in `frontend/src/config.js`
- Cloudinary settings in `backend/src/cloudinary/cloudinary.js`

## Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the frontend from backend:
   ```javascript
   // In backend/app.js
   app.use(express.static(path.join(__dirname, '../frontend/dist')))
   ```
3. Start production server:
   ```bash
   npm start
   ```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
MIT License
