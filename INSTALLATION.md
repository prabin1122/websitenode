# Installation Guide

## Prerequisites

- Node.js 20+
- npm 10+
- Docker and Docker Compose
- PostgreSQL 15+ (local or managed)
- Redis 7+

## Local setup

1. Copy environment examples:
   - `cp .env.example .env`
   - `cp backend/.env.example backend/.env`
   - `cp frontend/.env.example frontend/.env`

2. Install dependencies:
   - `npm install`
   - `cd backend && npm install`
   - `cd frontend && npm install`

3. Start Docker services:
   - `docker-compose up -d`

4. Run Prisma migrations:
   - `cd backend && npm run prisma:migrate`

5. Seed initial data:
   - `cd backend && node prisma/seed.ts`

6. Start services:
   - `npm run dev:backend`
   - `npm run dev:frontend`

## Notes

- Backend API is available at `http://localhost:4000/api`
- Frontend is available at `http://localhost:3000`
- Swagger docs are available at `http://localhost:4000/docs`
