# EEC Calendar Setup Guide

This project consists of a React/Vite frontend and a Python/FastAPI backend. Follow these instructions to set up and run both components locally.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)

---

## 🛠️ Step 1: Backend Setup

Navigate to the `backend/` directory:

```bash
cd backend
```

### 1. Create a Virtual Environment (Recommended)
Create and activate a Python virtual environment to keep dependencies isolated:
```bash
python -m venv venv
```
- **On Windows (PowerShell/CMD):**
  ```bash
  .\venv\Scripts\activate
  ```
- **On macOS/Linux:**
  ```bash
  source venv/bin/activate
  ```

### 2. Install Dependencies
Install all required Python packages:
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy the `.env.example` file to `.env`:
- **On Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **On CMD/Bash/macOS/Linux:**
  ```bash
  cp .env.example .env
  ```

> [!TIP]
> **Database Options:**
> By default, the app is configured for **PostgreSQL**. If you want a quick local setup with zero database installation, you can change the `DATABASE_URL` line inside your new `.env` file to use **SQLite** instead:
> ```env
> DATABASE_URL=sqlite:///./calendar.db
> ```

### 4. Seed the Database
Run the seed script to create all necessary database tables and populate default departments and the default Admin account:
```bash
python seed.py
```

### 5. Run the Backend Server
Start the FastAPI server using Uvicorn:
```bash
uvicorn main:app --reload
```
The backend API will run at **`http://localhost:8000`**. You can view the API documentation at `http://localhost:8000/docs`.

---

## 💻 Step 2: Frontend Setup

Open a new terminal window/tab and navigate to the `frontend/` directory:

```bash
cd frontend
```

### 1. Configure Environment Variables
Copy the `.env.example` file to `.env`:
- **On Windows (PowerShell):**
  ```powershell
  Copy-Item .env.example .env
  ```
- **On CMD/Bash/macOS/Linux:**
  ```bash
  cp .env.example .env
  ```

### 2. Install Dependencies
Install the Node.js packages:
```bash
npm install
```

### 3. Run the Frontend App
Start the Vite development server:
```bash
npm run dev
```
The frontend application will be available at **`http://localhost:5173`**.

---

## 🔑 Step 3: Login Credentials

Once both servers are running, navigate to **`http://localhost:5173`** and use the seeded administrator credentials:

- **Username:** `admin`
- **Password:** `Admin@123`
