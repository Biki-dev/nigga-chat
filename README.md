
# Nigga-Chat

![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-RealTime-orange)

## Project Overview
Nigga-Chat is a real-time chat application backend built with Node.js, Express.js, and MongoDB. It provides secure user authentication, instant messaging, and contact management.

---

## Key Features

- **User Authentication:** Secure signup and login with bcryptjs and JWT.
- **Real-Time Messaging:** Instant message delivery using Socket.IO.
- **Contact Management:** View and manage contacts.
- **Media Handling:** Cloudinary integration for image and media storage.
- **RESTful API:** Well-structured API for frontend integration.
- **Responsive Design:** Optimized for desktop and mobile use.
- **Optional Features:** Emoji & GIF support, message reactions, typing indicators, dark/light mode.

---

## Prerequisites

- **Node.js:** v16+ ([Download here](https://nodejs.org/))  
- **npm (Node Package Manager):** Usually installed with Node.js  
- **MongoDB:** Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- **Cloudinary Account:** For media storage ([Sign up](https://cloudinary.com/))

---

## Installation & Setup

1. **Clone the repository**
```bash
git clone <repository_url>
cd nigga-chat
```

2. **Navigate to the backend**
```bash
cd backend
```

3. **Install dependencies**
```bash
npm install
```

4. **Configure environment variables**
   Create a `.env` file:
```
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<cloudinary_name>
CLOUDINARY_API_KEY=<cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
PORT=5000
```

5. **Start the development server**
```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint           | Description            | Request Body                    | Response                                        |
| ------ | ------------------ | ---------------------- | ------------------------------- | ----------------------------------------------- |
| POST   | `/api/auth/signup` | Register a new user    | `{ fullName, email, password }` | `{ message, user (excluding password), token }` |
| POST   | `/api/auth/login`  | Login an existing user | `{ email, password }`           | `{ message, user (excluding password), token }` |
| GET    | `/api/users`       | Get all contacts       | `{ }`                           | `[ { _id, fullName, email, profilePic }, ... ]` |
| POST   | `/api/messages`    | Send a message         | `{ receiverId, message }`       | `{ message: "Message sent successfully" }`      |

### Example: Signup Endpoint

```javascript
// Sample request body for /api/auth/signup
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## Deployment

To deploy the project:
```bash
npm run deploy
```

Make sure your hosting platform supports Node.js and has access to MongoDB. Configure environment variables as in the setup instructions.

---

## FAQ

**Q: What is Nigga-Chat?**
A: A real-time chat backend that supports authentication, messaging, and media handling.

**Q: How do I run it locally?**
A: Clone the repo, install dependencies, configure `.env`, and run `npm run dev`.

**Q: Which technologies are used?**
A: Node.js, Express.js, MongoDB, Socket.IO, Cloudinary, JWT.

**Q: Is it mobile-friendly?**
A: Yes, the design is responsive.

**Q: Can I contribute?**
A: Yes! Fork the repo, make changes, and submit a pull request.

**Q: Are messages secure?**
A: Passwords are hashed and JWT is used for session management.

---

## Project Structure

```
├── .gitignore
└── backend/
    ├── package-lock.json
    ├── package.json
    └── src/
        ├── controllers/
        │   ├── auth.controller.js
        │   └── message.controller.js
        ├── lib/
        │   ├── cloudinary.js
        │   ├── db.js
        │   ├── socket.js
        │   └── utils.js
        ├── middleware/
        │   ├── auth.middleware.js
        │   └── socket.auth.middleware.js
        ├── models/
        │   ├── Message.js
        │   └── User.js
        └── routes/
```

---

## Contributing Guidelines

1. Fork the repository
2. Create a new branch for your feature/bug fix
3. Make your changes with clear commit messages
4. Submit a pull request to the `main` branch

Follow the existing code style, test your changes, and add documentation if needed.

---

## License

All rights reserved by the owner, Biki-dev. No license specified.
```
