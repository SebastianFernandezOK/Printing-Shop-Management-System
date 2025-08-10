# Printing-Shop-Management-System
# Printing Shop Management System – FastAPI & React Admin

A modern management system for printing shops, featuring a FastAPI backend (Python, layered architecture) and a React Admin frontend (TypeScript). Includes full CRUD for users and roles, PostgreSQL integration, secure environment variable handling, and real-time pagination. Easily customizable and ready for deployment.

## Features
- FastAPI backend with async PostgreSQL connection
- Layered architecture: models, schemas, repositories, services, controllers
- Full CRUD for users and roles
- React Admin frontend with TypeScript
- Real pagination and role selection
- Secure environment variable management (no credentials in code)
- CORS configuration for safe frontend-backend communication

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL database

### Backend Setup
1. Copy `.env.example` to `.env` and set your database credentials:
   ```env
   DB_HOST=your_host
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_db
   ```
2. Install dependencies:
   ```bash
   pip install -r app/requirements.txt
   ```
3. Run the backend:
   ```bash
   cd app
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd app/frontend
   npm install
   ```
2. Start the frontend:
   ```bash
   npm run dev
   ```

## Folder Structure
```
app/
  main.py
  backend/
    ...
  frontend/
    ...
```

## Security
- Do not commit your `.env` files with credentials.
- All sensitive data is loaded from environment variables.

## License
MIT
