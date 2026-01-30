"# Modett Launch Page Application

A beautiful waitlist landing page for Modett - Elegance, Amplified.

## Project Structure

```
Launch App/
├── frontend/          # Next.js 14 + TypeScript frontend
│   ├── app/
│   │   ├── page.tsx           # Main landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   └── WaitlistForm.tsx   # Waitlist form component
│   └── public/
│       └── logo.png           # Modett logo
│
├── backend/           # Fastify + TypeScript backend
│   ├── src/
│   │   ├── server.ts         # Main server file
│   │   ├── routes.ts         # API routes
│   │   └── db.ts             # Prisma client
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── .env                  # Environment variables
│
└── README.md
```

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: Playfair Display (headings) + Inter (body)

### Backend
- **Framework**: Fastify 5
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **CORS**: @fastify/cors

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)

## Database Setup

### 1. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE modett_waitlist;

# Exit psql
\q
```

### 2. Update Backend Environment Variables

Edit `backend/.env` with your PostgreSQL credentials:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/modett_waitlist
PORT=3001
```

Replace:
- `YOUR_USERNAME` with your PostgreSQL username
- `YOUR_PASSWORD` with your PostgreSQL password

Example:
```env
DATABASE_URL=postgresql://postgres:mypassword@localhost:5432/modett_waitlist
PORT=3001
```

## Installation & Setup

### Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma db push

# Start backend server
npm run dev
```

The backend will run on **http://localhost:3001**

### Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on **http://localhost:3000**

## Running the Application

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**: Navigate to **http://localhost:3000**

## Database Schema

The waitlist table structure:

```sql
CREATE TABLE Waitlist (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email     VARCHAR(255) UNIQUE NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source    VARCHAR(50) DEFAULT 'landing_page'
);
```

## API Endpoints

### POST /api/waitlist
Add email to waitlist

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Joined waitlist successfully"
}
```

**Error Responses:**
- **400** - Invalid email format
- **409** - Email already in waitlist
- **500** - Internal server error

## Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (GUI for database)
npx prisma studio

# Create a migration
npx prisma migrate dev --name migration_name
```

## Viewing Database Data

### Option 1: Prisma Studio (Recommended)
```bash
cd backend
npx prisma studio
```
Opens GUI at **http://localhost:5555**

### Option 2: PostgreSQL CLI
```bash
# Connect to database
psql -U YOUR_USERNAME -d modett_waitlist

# View all waitlist entries
SELECT * FROM "Waitlist";

# Count total signups
SELECT COUNT(*) FROM "Waitlist";

# Exit
\q
```

## Environment Variables

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/modett_waitlist
PORT=3001
```

### Frontend (Optional - `frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
npx kill-port 3000

# Kill process on port 3001 (backend)
npx kill-port 3001
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in `backend/.env`
- Ensure database `modett_waitlist` exists

### Prisma Client Error
```bash
cd backend
npx prisma generate
npx prisma db push
```

### CORS Error
- Ensure backend is running on port 3001
- Check CORS configuration in `backend/src/server.ts`

## Features

✅ Beautiful, responsive landing page
✅ Email validation
✅ Duplicate email prevention
✅ Real-time form feedback
✅ PostgreSQL database storage
✅ Type-safe with TypeScript
✅ Social media links
✅ Mobile-friendly design

## Design Specifications

- **Background Color**: #E5E0D6 (Alabaster)
- **Primary Font**: Playfair Display (headings)
- **Body Font**: Inter
- **Button Color**: #4A5568 (Slate)
- **Accent Color**: #D4A373 (Tan/Gold)
- **Logo Size**: 200×140px

## Next Steps

- [ ] Add email sending service (Resend, SendGrid)
- [ ] Create admin dashboard to view waitlist
- [ ] Add analytics tracking
- [ ] Set up production deployment
- [ ] Add email notification on signup
- [ ] Create privacy policy and terms of service pages

## License

Private - Modett © 2025

## Support

For issues or questions, contact your development team" 
