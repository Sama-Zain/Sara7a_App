# 📩 Sara7a App

Sara7a App is a backend REST API built with **Node.js, Express, and MongoDB** that allows users to create accounts and receive anonymous messages securely.

---

# 🚀 Features

- User Signup
- User Login
- Password Hashing using bcrypt
- Phone Number Encryption using AES-256-CBC
- MongoDB Database using Mongoose
- Clean project structure
- Custom error and success responses

---

# 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- crypto
- dotenv

---

## 📂 Project Structure

```
Sara7a_App
│
├── Config
│   └── dev.env
│
├── node_modules
│
├── Src
│   │
│   ├── DB
│   │   ├── Models
│   │   │   └── user.model.js
│   │   ├── connections.js
│   │   └── database.repository.js
│   │
│   ├── Middleware
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── Modules
│   │   ├── Auth
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.validation.js
│   │   │   └── index.js
│   │   │
│   │   ├── User
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   └── index.js
│   │   │
│   │   └── index.js
│   │
│   ├── uploads
│   │   ├── users
│   │   └── 807953.jpg
│   │
│   ├── Utils
│   │   ├── enums
│   │   │   ├── security.enum.js
│   │   │   └── user.enum.js
│   │   │
│   │   ├── multer
│   │   │   └── local.multer.js
│   │   │
│   │   ├── response
│   │   │   ├── error.response.js
│   │   │   └── succes.response.js
│   │   │
│   │   ├── security
│   │   │   ├── encryption.security.js
│   │   │   ├── hash.security.js
│   │   │   └── index.js
│   │   │
│   │   └── tokens
│   │       └── token.js
│   │
│   └── app.controller.js
│
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```
