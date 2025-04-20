# Carbon Credit Tracker – Comprehensive Technical Documentation

## Table of Contents

1. Components Overview
2. System Architecture
3. Database Schema
4. API Documentation
5. Data Flow
6. Security Implementation
7. Testing & Quality Assurance
8. Deployment Architecture
9. Future Enhancements
10. Technical Appendix

## 1. Components Overview

### 1.1 Authentication Components
- Login Component:
  - Handles user authentication with JWT
  - Form validation using standard forms
  - Redux state management for auth status
- Register Component:
  - User registration with role selection
  - Organization details for employers
  - Validation for required fields

### 1.2 Core Components
- Dashboard Components:

### 1.2 Dashboard Components
- Employee Dashboard:
  - TripLogger: Log eco-friendly commutes
  - CreditChart: Visualize earned credits
  - AddressUpdater: Manage home/work locations
- Employer Dashboard:
  - EmployeeList: Monitor employee activities
  - CreditManager: Handle credit distributions
  - OrganizationStats: View company-wide metrics
- Admin Dashboard:
  - OrganizationApproval: Manage new registrations
  - SystemMetrics: Monitor platform usage
  - UserManagement: Handle user accounts
- Management Components:
  - UserManager
  - OrganizationManager
  - CreditDistributor

## 2. System Architecture

### 2.1 Technology Stack
```
                    Frontend                                 Backend
    +----------------------------------+    +----------------------------------+
    |           React (v19.1)          |    |           Express (v5.1)        |
    |----------------------------------|    |----------------------------------|
    | - React Router (v7.5)            |    | - MongoDB (Mongoose v8.13)      |
    | - Axios                          |    | - JWT Authentication            |
    | - Recharts                       |    | - BCrypt Encryption            |
    +----------------------------------+    +----------------------------------+

### 2.2 Directory Structure
```
carbon-credit-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
```

## 3. Database Schema

### 3.1 User Schema
```
User {
  name: String (required)
  email: String (required, unique)
  password: String (required)
  role: String (enum: ['admin', 'employer', 'employee'])
  organization: String
  carbonCredits: Number
  homeAddress: String
  workAddress: String
  isApproved: Boolean
}
```

### 3.2 Trip Schema
```
Trip {
  userId: ObjectId (ref: 'User')
  date: Date
  distance: Number
  transportMode: String
  carbonSaved: Number
  verified: Boolean
  organizationId: String
}
```

### 3.3 Organization Schema
```
Organization {
  name: String (required)
  address: String
  adminId: ObjectId (ref: 'User')
  totalCredits: Number
  employeeCount: Number
  isActive: Boolean
}
```

## 4. API Documentation

### 4.1 Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/verify
POST /api/auth/logout
```

### 4.2 Trip Management
```
POST   /api/trips/create
GET    /api/trips/user/:userId
PUT    /api/trips/:tripId
DELETE /api/trips/:tripId
```

### 4.3 Organization Management
```
POST   /api/employer/register
GET    /api/employer/employees
PUT    /api/employer/credits
DELETE /api/employer/:employeeId
```

## 5. Data Flow

### 5.1 Authentication Flow
```
    User        Frontend        Backend         Database
     │             │              │                │
     │  Login      │              │                │
     │─────────────>              │                │
     │             │  Validate    │                │
     │             │──────────────>                │
     │             │              │    Query       │
     │             │              │───────────────>│
     │             │              │    Return      │
     │             │              │<───────────────│
     │             │  JWT Token   │                │
     │             │<─────────────│                │
     │  Success    │              │                │
     │<────────────│              │                │
```

### 5.2 Trip Logging Flow
```
   Employee       Frontend        Backend         Database
     │             │              │                │
     │  Log Trip   │              │                │
     │─────────────>              │                │
     │             │  Validate    │                │
     │             │──────────────>                │
     │             │              │    Save        │
     │             │              │───────────────>│
     │             │              │   Confirm      │
     │             │              │<───────────────│
     │             │  Success     │                │
     │             │<─────────────│                │
     │  Updated    │              │                │
     │<────────────│              │                │
```

## 6. Security Implementation

### 6.1 Authentication Security
- Password Hashing: BCrypt implementation
- JWT Token Management
- Role-based Access Control
- Session Management

### 6.2 Data Security
- Input Validation
- XSS Prevention
- CSRF Protection
- Rate Limiting

## 7. Testing & Quality Assurance

### 7.1 Frontend Testing
- Unit Tests: React Testing Library
- Integration Tests
- E2E Testing
- Component Testing

### 7.2 Backend Testing
- API Endpoint Testing
- Database Operations Testing
- Authentication Testing
- Load Testing

## 8. Deployment Architecture

### 8.1 Production Environment
```
                   Users
                     │
                     ▼
              Load Balancer
                     │
         ┌──────────┴──────────┐
         ▼                     ▼
    Frontend Server      Backend Server
         │                     │
         │                     ▼
         │              MongoDB Atlas
         │                     │
         └──────────┬─────────┘
                    │
              Monitoring &
                Logging
```

## 9. Future Enhancements

### 9.1 Planned Features
- Real-time trip tracking
- Public transportation integration
- Carbon credit marketplace
- Mobile application
- Advanced analytics dashboard

### 9.2 Technical Improvements
- Microservices architecture
- GraphQL implementation
- Real-time notifications
- Enhanced security features

## 10. Technical Appendix

### 10.1 Dependencies
- Frontend Dependencies:
  - React v19.1.0
  - React Router v7.5.0
  - Axios v1.8.4
  - Recharts v2.15.2

- Backend Dependencies:
  - Express v5.1.0
  - Mongoose v8.13.2
  - JWT v9.0.2
  - BCrypt v3.0.2

### 10.2 Environment Configuration
```
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carbon_tracker
JWT_SECRET=your_jwt_secret
NODE_ENV=development

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 10.3 API Response Formats
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "role": "employee",
      "carbonCredits": 150
    }
  },
  "message": "Operation successful"
}
```