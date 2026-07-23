# Enterprise E-commerce Platform

This repository contains a scalable, production-oriented e-commerce platform built with:

- Backend: Node.js, Express, TypeScript, PostgreSQL, Redis, Prisma, JWT, BullMQ
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Infrastructure: Docker, Docker Compose, Kubernetes, Nginx, AWS-ready deployment
- Testing: Jest, Supertest, Playwright

## Quick start

1. Create environment files from examples.
2. Run `npm install` at repository root.
3. Start backend and frontend:
   - `npm run dev:backend`
   - `npm run dev:frontend`

## Structure

- `backend/` — API server and services
- `frontend/` — Next.js storefront and admin UI
- `infra/` — Docker Compose, Kubernetes manifests, Nginx config

## Notes

This scaffold includes enterprise architecture ready for extension with commerce features, vendor marketplace support, audit logging, and CI/CD.
