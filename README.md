# 🛍️ Aven — Modern Full-Stack E-commerce Platform

> A production-ready full-stack e-commerce application built with **Next.js**, **TypeScript**, **MongoDB**, and **Stripe**, featuring secure authentication, real-time checkout, order management, and a modern responsive user experience.

## 🌐 Live Demo

**Application:** https://aven-omega.vercel.app/

**Source Code:** https://github.com/Anfas01/aven

---

# 📖 Overview

Aven is a modern e-commerce application built to demonstrate real-world full-stack development practices using the latest Next.js App Router architecture.

The application allows users to browse products, securely authenticate, manage shopping carts, purchase products through Stripe Checkout, and view their order history.

Instead of relying on a traditional REST backend, the application leverages **Next.js Server Actions** for server-side business logic, resulting in a cleaner and more maintainable architecture.

---

# ✨ Key Features

### 🛒 Shopping Experience

* Browse available products
* Product detail pages
* Responsive product grid
* Search products
* Shopping cart management
* Quantity updates
* Buy Now functionality

### 🔐 Authentication

* JWT authentication
* Secure password hashing with bcrypt
* Protected routes
* HTTP-only cookies
* Login & Registration

### 💳 Payments

* Stripe Checkout integration
* Secure payment flow
* Buy Now support
* Checkout directly from cart
* Automatic order creation using Stripe Webhooks

### 📦 Orders

* Order history
* Purchased products
* Payment status
* Customer information
* Order persistence in MongoDB

### ⚡ Backend

* Next.js Server Actions
* MongoDB database
* Mongoose models
* Secure API endpoints
* Stripe webhook handling

---

# 🛠 Tech Stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 15 (App Router) |
| Language        | TypeScript              |
| Database        | MongoDB                 |
| ODM             | Mongoose                |
| Authentication  | JWT + bcrypt            |
| Payment Gateway | Stripe Checkout         |
| Styling         | Tailwind CSS            |
| UI Components   | shadcn/ui               |
| Deployment      | Vercel                  |
| Linting         | ESLint                  |

---

# 🏗 Architecture

```
Client
   │
   ▼
Next.js App Router
   │
   ▼
Server Actions
   │
   ├──────── MongoDB
   │
   └──────── Stripe API
                  │
                  ▼
          Stripe Checkout
                  │
                  ▼
          Stripe Webhook
                  │
                  ▼
          Order Creation
```

---

# 📂 Project Structure

```
.
├── actions
│   ├── authActions
│   ├── cartActions
│   └── stripeActions
│
├── app
│   ├── (auth)
│   ├── (store)
│   └── api
│       └── webhooks
│
├── components
├── lib
├── models
├── types
└── public
```

---

# 🔄 Application Flow

```
Visitor
      │
      ▼
Browse Products
      │
      ▼
View Product
      │
      ▼
Login / Register
      │
      ▼
Add to Cart
      │
      ▼
Checkout
      │
      ▼
Stripe Payment
      │
      ▼
Webhook
      │
      ▼
Create Order
      │
      ▼
Order History
```

---

# 🔐 Authentication Flow

1. User registers.
2. Password is hashed using **bcrypt**.
3. JWT token is generated.
4. Token is stored in an HTTP-only cookie.
5. Protected Server Actions verify the token before executing.
6. Logout clears the authentication cookie.

---

# 💳 Stripe Payment Flow

```
User Checkout
      │
      ▼
Create Stripe Session
      │
      ▼
Redirect to Stripe
      │
      ▼
Successful Payment
      │
      ▼
Stripe Webhook
      │
      ▼
Verify Signature
      │
      ▼
Create Order
      │
      ▼
Success Page
```

---

# 🗄 Database Models

### User

* Authentication
* Profile information

### Cart

* User reference
* Cart items
* Quantity

### Order

* Purchased products
* Shipping information
* Payment information
* User reference
* Order status

---

# ⚙ Environment Variables

Create a `.env.local` file.

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `MONGODB_URI`           | MongoDB connection string |
| `JWT_SECRET`            | JWT signing secret        |
| `STRIPE_SECRET_KEY`     | Stripe Secret Key         |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret     |
| `NEXT_PUBLIC_URL`       | Application URL           |

---

# 🚀 Getting Started

Clone the repository

```bash
git clone https://github.com/Anfas01/aven.git
```

Move into the project

```bash
cd aven
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Start production

```bash
npm run start
```

---

# 📜 Available Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| npm run dev   | Start development server |
| npm run build | Build production         |
| npm run start | Start production         |
| npm run lint  | Run ESLint               |

---

# 🚀 Highlights

This project demonstrates experience with:

* Full-stack application architecture
* Next.js App Router
* Server Actions
* Authentication & Authorization
* Stripe payment integration
* MongoDB data modeling
* Webhook implementation
* Secure backend development
* Responsive UI development
* TypeScript best practices

---

# 🔮 Future Improvements

* Admin dashboard
* Product reviews
* Wishlist
* Inventory management
* Email notifications
* Search filters
* Product recommendations
* Optimistic UI updates
* Role-based authorization

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project is available for educational and portfolio purposes.

---

# 👨‍💻 Developer

**Anfas**

GitHub: https://github.com/Anfas01

Project Repository:
https://github.com/Anfas01/aven

Live Application:
https://aven-omega.vercel.app/
