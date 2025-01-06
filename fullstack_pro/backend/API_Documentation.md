# API Documentation for Fullstack Student-Teacher Job Application System

## Overview
This document provides detailed information about the API endpoints available in the Fullstack Student-Teacher Job Application System. The API follows RESTful principles and is designed to facilitate communication between the frontend and backend.

## Authentication Endpoints

### Student Registration
- **Endpoint**: `POST /api/auth/student/register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201 Created**: 
    ```json
    {
      "message": "Student registered successfully."
    }
    ```
  - **400 Bad Request**: 
    ```json
    {
      "error": "Email already exists."
    }
    ```

### Student Login
- **Endpoint**: `POST /api/auth/student/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "token": "jwt_token"
    }
    ```
  - **401 Unauthorized**: 
    ```json
    {
      "error": "Invalid credentials."
    }
    ```

### Teacher Registration
- **Endpoint**: `POST /api/auth/teacher/register`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201 Created**: 
    ```json
    {
      "message": "Teacher registered successfully."
    }
    ```

### Teacher Login
- **Endpoint**: `POST /api/auth/teacher/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "token": "jwt_token"
    }
    ```

## Student Endpoints

### Get Student Profile
- **Endpoint**: `GET /api/students/profile`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  - **200 OK**: 
    ```json
    {
      "name": "string",
      "email": "string",
      "profile": { ... }
    }
    ```

### Update Student Profile
- **Endpoint**: `PUT /api/students/profile`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response**:
  - **200 OK**: 
    ```json
    {
      "message": "Profile updated successfully."
    }
    ```

### Get Available Jobs
- **Endpoint**: `GET /api/students/jobs`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  - **200 OK**: 
    ```json
    [
      {
        "jobId": "string",
        "title": "string",
        "description": "string"
      }
    ]
    ```

### Apply for a Job
- **Endpoint**: `POST /api/students/jobs/apply`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "jobId": "string"
  }
  ```
- **Response**:
  - **201 Created**: 
    ```json
    {
      "message": "Application submitted successfully."
    }
    ```

## Teacher Endpoints

### Create New Job
- **Endpoint**: `POST /api/teachers/jobs`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response**:
  - **201 Created**: 
    ```json
    {
      "message": "Job created successfully."
    }
    ```

### Get Created Jobs
- **Endpoint**: `GET /api/teachers/jobs`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  - **200 OK**: 
    ```json
    [
      {
        "jobId": "string",
        "title": "string",
        "description": "string"
      }
    ]
    ```

### Get Job Applicants
- **Endpoint**: `GET /api/teachers/jobs/:id/applicants`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  - **200 OK**: 
    ```json
    [
      {
        "studentId": "string",
        "name": "string"
      }
    ]
    ```

## Error Handling
All endpoints will return appropriate HTTP status codes and error messages for invalid requests.

## Conclusion
This API documentation provides a comprehensive overview of the available endpoints in the Fullstack Student-Teacher Job Application System. For further details, refer to the source code and the README file.
