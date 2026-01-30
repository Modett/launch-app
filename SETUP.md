# Quick Setup Guide - Modett Launch Page

## Prerequisites
- Node.js v18+ installed
- PostgreSQL installed and running
- npm or yarn package manager

## Step-by-Step Setup

### 1. Database Setup

```bash
# Start PostgreSQL (if not running)
# Windows: Start PostgreSQL service from Services
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE modett_waitlist;
\q
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Update .env file with your database credentials
# Edit backend/.env:
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/modett_waitlist
PORT=3001

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Start backend server
npm run dev
```

Backend will run on **http://localhost:3001**

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:3000**

## Testing the Application

1. Open browser to **http://localhost:3000**
2. Enter an email in the form
3. Click "JOIN THE WAITLIST"
4. Check database to see the entry

### View Database Entries

**Option 1: Prisma Studio (GUI)**
```bash
cd backend
npx prisma studio
```
Opens at **http://localhost:5555**

**Option 2: PostgreSQL CLI**
```bash
psql -U postgres -d modett_waitlist
SELECT * FROM "Waitlist";
\q
```

## Common Issues

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in `backend/.env`
- Run `npx prisma generate` again

### Frontend can't connect to backend
- Ensure backend is running on port 3001
- Check browser console for CORS errors
- Verify API URL in frontend code

### Database connection error
```bash
cd backend
npx prisma db push
```

## Project Structure

```
Launch App/
├── frontend/       # Next.js app (port 3000)
├── backend/        # Fastify API (port 3001)
└── README.md       # Full documentation
```

## What's Next?

- View full documentation in [README.md](README.md)
- Add your PostgreSQL credentials to `backend/.env`
- Start both servers and test the waitlist form
- Check Prisma Studio to see collected emails

---

**Need help?** Check the full [README.md](README.md) for detailed documentation.
