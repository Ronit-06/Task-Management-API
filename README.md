# 📝 Task Management API

A **production-ready Task Management API** built with **Node.js, Express.js, and MongoDB**, designed for handling tasks, users, and authentication.  
Includes advanced features like **reminder emails, bot protection, rate limiting, detailed logging, and commenting support**.

---

## ⚡ Features

- **User Management**
  - Create, update, and delete user accounts
  - Password hashing with **bcrypt** for security
- **Authentication**
  - JWT-based authentication
  - Secure login & registration
- **Task Management**
  - Create, update, delete, and fetch tasks
  - Commenting on tasks
  - Track task status (e.g., pending, completed)
- **Reminder Emails**
  - Scheduled email reminders for tasks
  - Powered by **Redis** + **Bull** + **Nodemailer**
- **Security (via Arcjet)**
  - Bot protection
  - Rate limiting
  - Bucket tokens for controlled access
- **Error Handling**
  - Centralized error middleware with consistent API responses
- **Logging**
  - Detailed logs for each user action and API event
- **Code Quality**
  - Enforced standards and linting with ESLint

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Tokens (JWT), bcrypt  
- **Task Queue:** Redis + Bull  
- **Emails:** Nodemailer  
- **Security:** Arcjet (bot protection, rate limiting, token bucket)  
- **Environment Management:** dotenv
- **Code Quality: **ESLint

---

## 📌 API Endpoints

- **User Routes**
  - GET /api/users → Get all users and their information (Admin only)
  - GET /api/users/:id → Get user by ID
- **Auth Routes**
  - POST /api/auth/signup → Register new user
  - POST /api/auth/login → Login and receive JWT
- **Task Routes**
  - GET /api/tasks → Get all tasks
  - GET /api/tasks/:id → Get specific task
  - GET /priority/:level → get tasks based on their priority
  - POST /api/tasks → Create a task
  - POST /api/tasks/:id/assign → Assign a user to a task
  - POST /api/tasks/:id/unassign → Unassign a user to a task
  - POST /api/tasks/:id/comments → Add a comment on a task
  - PUT /api/tasks/:id → Update a task
  - DELETE /api/tasks/:id → Delete a task
  - DELETE /api/tasks/:id/comments/:commentId → delete a comment on a task

---

## 🚀 Getting Started

  - **📦 Installation**
     - Clone the repository:
       
       ```
       git clone https://github.com/Ronit-06/Task-Management-API.git
       cd Task-Management-API
       ```
       
    - Install dependencies:
      
      ```
      npm install
      ```
      
    - Set up environment variables:
      - Create a .env.development.local file in the root directory and add the following:
        
      ```
      PORT=4000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret_key
      REDIS_HOST=your_redis_public_endpoint
      REDIS_PORT=12570
      REDIS_USERNAME = "default" 
      REDIS_PASSWORD = your_redis_cloud_password
      ARCJET_API_KEY=your_arcjet_api_key
      ARCJET_ENV = development
      EMAIL = your_email@email.com
      EMAIL_PASSWORD = your_email_app_key
      ```
    - Start the development server:

      ```
      npm run dev
      ```
      
    - Start redis in a seperate terminal:
   
      ```
      npm run start:worker
      ```
      
  - **Usage:**
    - Authentication
      - Register a new user via POST /api/auth/signup.
      - Log in with POST /api/auth/login with the awt token recived from the signup.
    - Task Management
      - Create tasks with POST /api/tasks
      - Update tasks using PUT /api/tasks/:id
      - Delete tasks with DELETE /api/tasks/:id
      - Add comments to tasks via POST /api/tasks/:id/comments
    - Reminder Emails
        - Reminder emails are sent based on task schedules using Redis and Bull queues.
        - Monitored on Redis Cloud.
    -  Security Features
        - Bot protection and rate limiting are enforced via Arcjet middleware.
        - Monitored on Arcjet Dashboard.
      
## 👨‍💻 Developer Notes 

- This project is my attempt at building a production-ready API from scratch.
  
- **Some key points from my journey:**
  - This is my first time implementing Redis and Bull for background jobs and scheduled tasks. I learned how queues help scale features like reminder emails without blocking        the main API flow.
  - It’s also my first time making a complete API from scratch, handling everything from user auth to task logic, security middleware, and error handling.
  - I focused on using industry practices like JWT authentication, password hashing, middleware-based architecture, and structured logging to make the project closer to real-       world production APIs.
  - I explored Arcjet for bot protection, rate limiting, and token bucket security — something I hadn’t used before, but it gave me hands-on experience with API hardening.
  - I also enforced code quality with ESLint, ensuring consistent formatting and adherence to best practices, which helped me maintain a clean and professional codebase.
  - Overall, this project was a way for me to explore scalable backend design and build something practical enough to be deployed in a real-world scenario.

---

## 📜 License

- **This project is licensed under the MIT License.**

