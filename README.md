# 🎬 YouTube Clone – Full Stack Video Platform

A high-performance **full-stack video sharing platform** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.

This project replicates core YouTube functionality including **authentication, video uploads, channel creation, search functionality, and an interactive comment system**.

---

# 🚀 Features

## 🔐 User Authentication

- Secure **User Registration & Login**
- Authentication using **JWT (JSON Web Tokens)**
- Password hashing with **bcrypt**

## 📺 Video Hosting

- Upload and stream videos
- Video playback with a dedicated player page
- Track **views, categories, and metadata**

## 📂 Channel Management

- Users can create and manage their own **channels**
- Upload videos to personal channels
- Channel pages displaying uploaded content

## 🔍 Intelligent Search

- Real-time search functionality
- **Regex-based title matching**
- Dedicated **search results page**

## 💬 Engagement Tools

- Comment system with full **CRUD functionality**
- Users can:
  - Post comments
  - Edit comments
  - Delete comments
- **Like / Dislike** interaction system

## 🎨 Responsive UI

- Built using **Tailwind CSS**
- Toggleable sidebar navigation
- Category filters on the homepage
- Clean and modern design

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router DOM
- Axios
- Timeago.js

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas (NoSQL)

## Authentication

- JWT (JSON Web Tokens)
- Bcrypt.js

---

# 💻 Getting Started

Follow these steps to run the project locally.

---

# 📋 Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account

---

# ⚙️ Backend Setup

1. Navigate to the backend folder

```bash
cd youtubeBackend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Start the backend server

```bash
npm start
```

---

# 💻 Frontend Setup

1. Navigate to the frontend folder

```bash
cd youtubeFrontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:5173
```

---

# 📁 Project Structure

## Backend

```
youtubeBackend/
│
├── models/        # MongoDB Schemas
│   ├── User.js
│   ├── Channel.js
│   ├── Video.js
│   └── Comment.js
│
├── routes/        # API Routes
│   ├── auth.js
│   ├── video.js
│   ├── channel.js
│   └── comment.js
│
├── controllers/   # Business Logic
├── middleware/    # JWT verification & security
└── server.js
```

## Frontend

```
youtubeFrontend/
│
├── pages/         # Main pages
│   ├── Home.jsx
│   ├── VideoPlayer.jsx
│   ├── Channel.jsx
│   ├── Auth.jsx
│   └── SearchResults.jsx
│
├── components/    # Reusable UI components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── SearchBar.jsx
│   └── Modals.jsx
│
└── App.jsx
```

---

# 📊 Requirements Implemented

- ✅ Minimum **6 category filters** on the homepage
- ✅ Functional **video player page**
- ✅ **Search system** with results page
- ✅ **Channel creation** feature
- ✅ Full **CRUD operations for comments**
eix
---

# 👨‍💻 Author

Developed as a **Full Stack MERN Project** to demonstrate modern web development skills.
