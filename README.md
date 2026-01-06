# Ecommerce Backend API

E-commerce backend built with **Node.js**, **Express**, and **MongoDB**, focused on backend best practices, data validation, and clean architecture.

The project includes authentication, product management, order processing, stock control, and order status handling, and is designed to be ready for future payment gateway integrations.

---

## Features

- JWT-based authentication
- User management with roles (`admin / user`)
- Products CRUD
- Order creation and management
- Real-time stock control
- Order statuses: `pending`, `paid`, `shipped`, `cancelled`
- Request validation using **Zod**
- Reusable middlewares
- Consistent error handling
- Modular and scalable architecture

---

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Zod** (request validation)
- **JWT** (authentication)
- **dotenv**

---

## Project Structure

src/
├── controllers/ # Business logic
├── routes/ # API endpoints
├── models/ # Mongoose models
├── utils/
│ ├── middlewares/ # Auth, validation, roles
│ └── validators/ # Zod schemas
├── config/ # App configuration
├── app.js # Express app
└── server.js # Entry point


---

## Authentication & Roles

- JWT-based authentication
- `VerifyToken` middleware to protect routes
- `isAdmin` middleware for restricted actions

---

## Request Validation

A dedicated **request validation layer** was implemented using **Zod**, validating:

- `body`
- `params`
- `query`

This ensures that only valid data reaches the business logic and the database.

Examples:
- Product creation validation
- Order creation validation
- MongoDB ObjectId validation

---

## Main Endpoints

### Auth
- POST /api/login


### Users
- GET /api/users (admin)
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id (admin)


### Products
- GET /api/products
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id


### Orders
- POST   /api/orders
- GET    /api/orders/my/:id
- GET    /api/orders           (admin)
- PATCH  /api/orders/:id/pay
- PATCH  /api/orders/:id/ship  (admin)
- POST   /api/cancel-order/:id




---

## Order Creation Flow

1. Client sends products and quantities
2. Request is validated using Zod
3. Stock availability is verified
4. Product stock is updated
5. Total amount is calculated on the backend
6. Order is created with `pending` status

---
## Database Seed (Demo Data)

To make the project easy to test, seed scripts are included to populate the database with demo data.

Seeded data includes:

Users (admin & regular user)

Products

Orders linked to users and products

Run seed:
npm run seed



##  Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=4000
MONGO_URI=mongodb://localhost/piccoli
JWT_SECRET=your_secret_key

## Install dependencies:
npm install

##Seed the database (optional but recommended):
npm run seed

## Run in development mode:
npm run dev


## Server will be avaliable at: 
http://localhost:4000

## Notes

The backend calculates totals and validates stock to prevent client-side manipulation

Designed following real-world backend patterns

Suitable as a portfolio project or as a base for a real e-commerce application