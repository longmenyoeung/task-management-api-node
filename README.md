# 📋 Task Management System API

A RESTful API built with **Express.js** and **MongoDB** for managing users, projects, and tasks. Features JWT authentication, role-based access control, input validation, rate limiting, and interactive Swagger documentation.

---

## 🚀 Features

- **Authentication** — Register & login with JWT-based access tokens
- **Role-Based Access Control** — Admin and User roles with protected routes
- **Project Management** — CRUD operations with owner-based authorization
- **Task Management** — Create, update, delete tasks with assignment to users
- **Input Validation** — Request validation using `express-validator` with strong password policies
- **Pagination** — Paginated list endpoints using `mongoose-paginate-v2`
- **Rate Limiting** — Global rate limiter to prevent API abuse (250 requests per 15 minutes)
- **Security Hardening** — Helmet headers, CORS, body size limits, bcrypt password hashing
- **Centralized Error Handling** — Custom `ApiError` class with global error handler middleware
- **API Documentation** — Auto-generated Swagger UI available at `/api/docs`
- **Soft Delete** — Users are deactivated instead of permanently removed

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Express.js](https://expressjs.com/) v5 | Web framework |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) v9 | Database & ODM |
| [JSON Web Tokens](https://jwt.io/) | Authentication |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing |
| [express-validator](https://express-validator.github.io/) | Input validation |
| [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Rate limiting |
| [Helmet](https://helmetjs.github.io/) | HTTP security headers |
| [Morgan](https://www.npmjs.com/package/morgan) | HTTP request logging |
| [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) | API documentation |
| [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) | NoSQL injection protection |

---

## 📁 Project Structure

```
Backend-api/
├── index.js                          # Application entry point
├── package.json
├── .env                              # Environment variables (not committed)
├── .gitignore
└── src/
    ├── config/
    │   └── db.js                     # MongoDB connection setup
    ├── controllers/
    │   ├── User.controller.js        # User auth & management logic
    │   ├── Project.controller.js     # Project CRUD logic
    │   └── Task.controller.js        # Task CRUD logic
    ├── middleware/
    │   ├── AuthMiddleware.js         # JWT authentication middleware
    │   ├── Authorizerole.js          # Role-based authorization middleware
    │   ├── ErrorHandler.js           # Global error handler middleware
    │   ├── Validation.js             # Express-validator result handler
    │   └── rateLimiters.js           # Rate limiting configuration
    ├── models/
    │   ├── UserModel.js              # User schema (username, email, password, role)
    │   ├── ProjectModel.js           # Project schema (name, description, owner)
    │   └── TaskModel.js              # Task schema (title, status, priority, assignedTo)
    ├── routes/
    │   ├── User.route.js             # User endpoints with Swagger docs
    │   ├── Project.route.js          # Project endpoints with Swagger docs
    │   └── Task.route.js             # Task endpoints with Swagger docs
    ├── Swagger/
    │   └── swaggerConfig.js          # Swagger/OpenAPI configuration
    ├── utils/
    │   ├── ApiError.js               # Custom error class
    │   └── ErrorMessage.js           # Predefined error classes
    └── validators/
        ├── userValidator.js          # User input validation rules
        ├── projectValidator.js       # Project input validation rules
        └── taskValidator.js          # Task input validation rules
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account or local MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/longmenyoeung/task-management-api-node.git
cd task-management-api-node
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_ATLAS=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Start the server

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

The server will start at `http://localhost:5000`

---

## 📖 API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:5000/api/docs
```

The raw OpenAPI JSON spec can be accessed at:

```
http://localhost:5000/api/docs.json
```

Visiting the root URL `/` will automatically redirect to the Swagger docs.

---

## 📡 API Endpoints

### Users

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/users/register` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Login and receive JWT token |
| `GET` | `/api/users` | Admin | Get paginated list of users |
| `GET` | `/api/users/:id` | Admin | Search user by ID |
| `DELETE` | `/api/users/:id` | Admin | Soft-delete a user (deactivate) |

### Projects

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/projects` | Authenticated | Create a new project |
| `GET` | `/api/projects` | Authenticated | Get paginated list of projects |
| `PUT` | `/api/projects/:id` | Owner only | Update a project |
| `DELETE` | `/api/projects/:id` | Owner only | Delete a project (cascades to tasks) |

### Tasks

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/tasks` | Authenticated | Get paginated list of tasks |
| `POST` | `/api/tasks/:projectId/create` | Project Owner | Create a task under a project |
| `PUT` | `/api/tasks/:id` | Owner / Assignee | Update a task |
| `DELETE` | `/api/tasks/:id` | Owner / Assignee | Delete a task |

---

## 🔐 Authentication

This API uses **JWT Bearer Token** authentication.

1. Register a user via `POST /api/users/register`
2. Login via `POST /api/users/login` to receive a token
3. Include the token in the `Authorization` header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

> Access tokens expire after **15 minutes**.

---

## 👤 Roles & Permissions

| Role | Permissions |
|---|---|
| **user** | Create projects, create/update/delete own tasks, view projects & tasks |
| **admin** | All user permissions + list/search/delete users |

- Only **one admin** account can exist in the system
- Only **project owners** can update or delete their projects
- Only **project owners or assigned users** can update or delete tasks

---

## 🛡️ Security Features

- **Helmet** — Sets secure HTTP response headers
- **CORS** — Cross-Origin Resource Sharing enabled
- **Rate Limiting** — 250 requests per IP per 15-minute window
- **bcryptjs** — Passwords hashed with 10 salt rounds
- **Body Size Limit** — JSON and URL-encoded bodies limited to 10KB
- **Input Validation** — Strong password rules (uppercase, lowercase, number, special character, min 8 chars)
- **Centralized Error Handling** — Errors flow through `ApiError` → `ErrorHandler` (no stack traces leaked)
- **Soft Delete** — Users are deactivated rather than permanently deleted
- **express-mongo-sanitize** — Protection against NoSQL injection attacks

---

## 📄 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error description here."
}
```

### Validation Error Response

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email is required."
    }
  ]
}
```

### Paginated Response

```json
{
  "success": true,
  "docs": [ ... ],
  "totalDocs": 25,
  "limit": 10,
  "totalPages": 3,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

---

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).