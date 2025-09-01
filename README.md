# 📝 Task Management API

A Node.js and Express.js based **Task Management API** that provides user authentication, task creation, and management features. Built with MongoDB for persistence and designed with clean architecture principles.

---

## ⚡ Features

- **User Management**
  - Create, update, delete user accounts
  - Secure password handling with hashing
- **Authentication**
  - User registration & login
  - JWT-based authentication
- **Task Management**
  - Create, update, delete, and fetch tasks
  - Assign tasks to users
  - Support for task statuses (e.g., pending, completed)
- **Error Handling**
  - Centralized error middleware for consistent API responses
- **Security**
  - Includes custom middleware (`arcjetMiddleware`) for request validation/security

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Middleware:** Custom error handling, security middleware
- **Environment Management:** dotenv

---

## 📌 API Endpoints

- **User Routes**
  - POST /api/users → Create a user
  - GET /api/users/:id → Get user by ID
- **Auth Routes**
  - POST /api/auth/register → Register new user
  - POST /api/auth/login → Login and receive JWT
- **Task Routes**
  - POST /api/tasks → Create a task
  - GET /api/tasks → Get all tasks
  - PUT /api/tasks/:id → Update a task
  - DELETE /api/tasks/:id → Delete a task

