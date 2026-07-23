# ShopHub — Enterprise E-Commerce Platform Technical Documentation

Welcome to the comprehensive technical documentation for **ShopHub**, a full-stack, enterprise-grade e-commerce platform built using Node.js, Express, Next.js, Prisma, PostgreSQL, Tailwind CSS, GraphQL, and Docker.

---

## 📋 Table of Contents
1. [Architecture Overview](#-architecture-overview)
2. [Directory Structure](#-directory-structure)
3. [Database Schema (Prisma ORM)](#-database-schema-prisma-orm)
4. [Backend API Reference](#-backend-api-reference)
5. [Frontend Application Architecture](#-frontend-application-architecture)
6. [Key Feature Workflows](#-key-feature-workflows)
7. [Installation & Deployment](#-installation--deployment)

---

## 🏗 Architecture Overview

ShopHub is designed as a modular **monorepo** workspace separating concerns cleanly between frontend storefront services, backend API endpoints, database persistence layers, and DevOps deployment scripts.

```
                    ┌──────────────────────────────────────────────┐
                    │               Next.js Storefront             │
                    │        (Pages Router + Tailwind CSS)         │
                    └──────────────────────┬───────────────────────┘
                                           │ HTTP / REST / GraphQL
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │              Express Node.js API             │
                    │         (Controllers / Services)             │
                    └──────────────┬────────────────┬──────────────┘
                                   │                │
                        Prisma ORM │                │ BullMQ / Redis
                                   ▼                ▼
                    ┌────────────────────┐   ┌────────────────────┐
                    │  PostgreSQL DB     │   │    Redis Cache     │
                    └────────────────────┘   └────────────────────┘
```

* **Frontend**: Next.js (React 18, TypeScript, Tailwind CSS), Pages Router, Context API for Cart Management, Slide-out Cart Drawer, Floating Toast Notifications.
* **Backend**: Node.js, Express.js, TypeScript, Apollo GraphQL Server, Swagger OpenAPI Documentation, JWT Authentication, BullMQ queueing.
* **Database & ORM**: PostgreSQL with Prisma ORM.

---

## 📁 Directory Structure

```
nodejs/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # Database models & relationships
│   │   └── seed.ts             # Initial database seeder
│   └── src/
│       ├── config/             # Environment & Prisma client setup
│       ├── controllers/        # Request handlers (auth, product, order, payment)
│       ├── graphql/            # GraphQL Schema & Resolvers
│       ├── middlewares/        # Auth, error handling, rate limiting
│       ├── routes/             # REST API routers (/api/auth, /api/products, /api/orders, /api/payments)
│       ├── services/           # Business logic layer
│       ├── app.ts              # Express application configuration
│       └── server.ts           # HTTP server initialization
├── frontend/
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── cart-drawer.tsx # Slide-out Cart Drawer
│       │   ├── navigation.tsx  # Top Header with Live Search
│       │   ├── product-card.tsx# Product display card with stock indicators
│       │   ├── toast.tsx       # Floating notification system
│       │   ├── layout.tsx      # Page container layout
│       │   └── footer.tsx      # Global footer
│       ├── context/
│       │   └── cart.tsx        # Cart Context State Provider
│       └── pages/
│           ├── index.tsx       # Home storefront page
│           ├── shop.tsx        # Catalog listing page with search & filters
│           ├── products/
│           │   └── [slug].tsx  # Single product detail page
│           ├── cart.tsx        # Cart overview & promo code page
│           ├── checkout.tsx    # Multi-step checkout with coupon validation
│           └── admin/
│               ├── index.tsx   # Admin login page
│               └── dashboard.tsx # Executive Analytics, Order Status, & Product Editor
└── infra/                      # Docker Compose & Kubernetes deployment manifests
```

---

## 🗄 Database Schema (Prisma ORM)

The relational schema is defined in `backend/prisma/schema.prisma`. Key models include:

### 1. `User`
Stores system accounts with Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `VENDOR`, `CUSTOMER`).

### 2. `Product` & `ProductVariant`
Contains product details, SKU, price, cost, discount %, categories, images, inventory count, and variants.

### 3. `Order` & `OrderItem`
Stores customer purchases, subtotal, tax, shipping costs, order status (`PENDING`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`), and line items.

### 4. `Payment` & `Shipping`
Tracks transaction status across providers (`STRIPE`, `PAYPAL`, `KHALTI`, `ESEWA`) and shipping tracking information.

---

## 📡 Backend API Reference

Base REST URL: `http://localhost:5000/api`

### **1. Authentication Endpoints (`/api/auth`)**
* `POST /api/auth/register` — Register a new account
* `POST /api/auth/login` — Login user & return JWT tokens
* `POST /api/auth/verify-email` — Verify user email address
* `POST /api/auth/forgot-password` — Trigger password reset email

### **2. Product Endpoints (`/api/products`)**
* `GET /api/products` — List products (supports pagination `page`, `limit`, category filter, and search query)
* `GET /api/products/:slug` — Retrieve single product details by slug
* `POST /api/products` — Create a new product *(Admin/Vendor)*
* `PUT /api/products/:id` — Update product details *(Admin/Vendor)*
* `DELETE /api/products/:id` — Delete a product *(Admin)*

### **3. Order Endpoints (`/api/orders`)**
* `GET /api/orders` — List all orders
* `GET /api/orders/:id` — Get order details by ID
* `POST /api/orders` — Create a new order
* `PATCH /api/orders/:id/status` — Update order fulfillment status

### **4. Payments Endpoints (`/api/payments`)**
* `POST /api/payments/session` — Initialize payment checkout session (Stripe / PayPal)
* `POST /api/payments/stripe` — Stripe webhook handler

---

## 💻 Frontend Application Architecture

### **1. Slide-out Cart Drawer (`frontend/src/components/cart-drawer.tsx`)**
Provides an animated drawer sliding out from the right margin when users click the cart button or add an item. Includes:
* Dynamic item list with quantity controls (`+`, `-`) and removal.
* Live subtotal calculation.
* Quick CTA to proceed directly to Checkout or View Full Cart.

### **2. Header Live Search (`frontend/src/components/navigation.tsx`)**
Integrates an instant autocomplete popover menu:
* Real-time filtering by product title or description as the user types.
* Thumbnail preview, price display, and 1-click navigation to product detail pages.

### **3. Floating Toast Notifications (`frontend/src/components/toast.tsx`)**
Application-wide notification system triggered via `showToast(message, type)`:
* Visual success (`✨`), error (`⚠️`), or info (`ℹ️`) badges with auto-dismiss after 3.5s.

### **4. Checkout & Coupon Discount Engine (`frontend/src/pages/checkout.tsx`)**
* **Coupon Validation**: Validates promo codes like `SAVE10` (10% discount) or `WELCOME20` ($20 off).
* **Shipping Methods**: Allows selecting Standard (Free), Express ($15), or Overnight ($25).
* **Automatic Calculation**: Dynamically updates subtotal, discount, tax (10%), shipping, and grand total.

### **5. Admin Analytics & Order Dashboard (`frontend/src/pages/admin/dashboard.tsx`)**
* **Executive Summary Widgets**: Real-time cards for Total Sales Revenue, Total Orders, Average Order Value, and Low Stock Alerts (products with <= 5 items remaining).
* **Order Status Workflow**: Interactive dropdown to update orders (`PENDING` -> `PROCESSING` -> `SHIPPED` -> `DELIVERED` -> `CANCELLED`).
* **CSV Order Export**: Export order details to `.csv` format.
* **Rich Product Editor**: Form for Title, Price, Category, Stock Count, Image URL, and Description.

---

## 🚀 Installation & Deployment

### Quick Start (Local Development)

```bash
# 1. Install workspace dependencies
npm install

# 2. Start PostgreSQL & Redis container services (optional via Docker)
docker-compose up -d

# 3. Apply Prisma database migrations
cd backend && npx prisma db push

# 4. Start concurrent development server
cd .. && npm run dev
```

The frontend will be live at `http://localhost:3000` and the backend API at `http://localhost:5000/api` (Swagger docs at `http://localhost:5000/docs`).

---

## 📝 Summary

The **ShopHub** platform provides a complete enterprise solution with high-performing UI components, robust backend REST & GraphQL services, relational schema persistence, analytics, and streamlined order fulfillment workflows.
