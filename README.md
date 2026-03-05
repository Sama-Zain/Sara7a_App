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
├── Src
│   ├── DB
│   │   ├── Models
│   │   │   └── user.model.js
│   │   ├── connections.js
│   │   └── database.repository.js
│
│   ├── Modules
│   │   ├── Auth
│   │   │   ├── auth.controller.js
│   │   │   └── auth.service.js
│   │   │
│   │   └── User
│   │       ├── user.controller.js
│   │       └── user.service.js
│
│   ├── Utils
│   │   ├── enums
│   │   ├── response
│   │   └── security
│
├── index.js
└── package.json
```
