# 📌 Task Tracker App

A full-stack task tracking application built using **React (TypeScript)** on the frontend and **Express.js with Prisma** on the backend.  
It allows users to manage tasks with features like adding, editing, deleting, marking complete/incomplete, filtering, sorting, and viewing task statistics.

---

## ✨ Features

- ✅ Add / Edit / Delete Tasks
- ✅ Mark tasks as Complete or In Progress
- ✅ Filter tasks by All, In Progress, or Completed
- ✅ Sort tasks by Newest or Oldest
- ✅ Summary cards showing task count by status
- ✅ Clean Notion-inspired UI using Bootstrap Icons

---

## ⚙️ Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React (TypeScript)     |
| Styling    | CSS, Bootstrap Icons   |
| Backend    | Express.js (Node.js)   |
| ORM        | Prisma                 |
| Database   | PostgreSQL             |

---

## 📂 Folder Structure

```
task-tracker/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── prisma/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── types.ts
│   └── ...
└── README.md
```

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 2. Install dependencies
Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

### 3. Set up the database
- Create a PostgreSQL database (e.g., using pgAdmin or createdb command).
- Create a .env file inside the backend/ directory:

```env
DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/yourdbname
```
Replace yourusername, yourpassword, and yourdbname with your actual PostgreSQL info.

### 4. Run Prisma migrations & generate the client

```bash
cd backend
# Ensure you're in the backend folder before running the following
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the backend server

```bash
cd backend
node server.js
```

The backend will run at: http://localhost:3001

### 6. Start the frontend React app

```bash
cd task-tracker
npm start
```
The frontend will open at: http://localhost:3000
