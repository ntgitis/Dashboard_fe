# E-Commerce Dashboard Frontend

A frontend dashboard for an e-commerce management system.

This project is built with **React**, **Vite**, **Material UI**, **React Router**, **TanStack React Query**, and **Axios**.

The application has two main areas:

- **Admin Dashboard**: manage products, orders, users, and overview statistics.
- **User Dashboard**: view orders, manage wishlist, manage addresses, and view profile information.

---

## Tech Stack

| Technology           | Purpose                                 |
| -------------------- | --------------------------------------- |
| React                | Build user interfaces                   |
| Vite                 | Development server and production build |
| Material UI          | UI components and layout                |
| React Router         | Client-side routing                     |
| TanStack React Query | API state management and caching        |
| Axios                | HTTP requests                           |
| Notistack            | Toast notifications                     |
| ESLint               | Code linting and code quality           |

---

## Features

### Authentication

- Login with backend API.
- Store `access_token`, `refresh_token`, and user information.
- Attach Bearer token automatically for protected requests.
- Logout with backend API.
- Protect routes by user role.

---

## Admin Features

### Overview

- Show key statistics from backend data.
- Show recent orders.
- Show low-stock products.

### Product Management

- View product list.
- Search products.
- Filter by category.
- Filter by active status.
- Create new product.
- Update product.
- Soft delete product.

### Order Management

- View order list.
- Filter orders by status.
- View order detail.
- Update order status.

### User / Customer Management

- View user list.
- Search by ID, name, email, or phone number.
- Filter by role.
- Update user role.

---

## User Features

### User Overview

- Show user order summary.
- Show wishlist count.
- Show address count.
- Show recent orders.

### User Orders

- View personal orders.
- View order detail.
- Cancel order when allowed.

### Wishlist

- View wishlist items.
- Add product to wishlist.
- Remove product from wishlist.
- Clear all wishlist items.

### Addresses

- View address list.
- Add new address.
- Update address.
- Delete address.
- Set default address.

### Profile

- View current user information.
- Profile is currently read-only because the backend does not have an update profile API yet.

---

## Project Structure

```txt
src/
├── app/
│   ├── App.jsx
│   ├── ProtectedRoute.jsx
│   ├── providers.jsx
│   └── routes.jsx
│
├── components/
│   ├── common/
│   │   ├── ConfirmDialog.jsx
│   │   ├── PageHeader.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusChip.jsx
│   └── layout/
│       ├── DashboardLayout.jsx
│       ├── Header.jsx
│       └── Sidebar.jsx
│
├── features/
│   ├── auth/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   └── user/
│       ├── dashboard/
│       ├── orders/
│       ├── wishlist/
│       ├── addresses/
│       └── profile/
│
├── services/
│   ├── adminUserApi.js
│   ├── addressApi.js
│   ├── authApi.js
│   ├── httpClient.js
│   ├── orderApi.js
│   ├── productApi.js
│   ├── tokenStorage.js
│   ├── userOrderApi.js
│   ├── userProductApi.js
│   └── wishlistApi.js
│
├── theme/
├── utils/
├── main.jsx
└── index.css
```

---

## Requirements

- Node.js installed.
- npm installed.
- Backend server running.
- Database configured and running.
- Test data available in the database.

Default backend API URL:

```txt
http://localhost:8080/api
```

---

## Installation

Clone the project:

```bash
git clone https://github.com/ntgitis/Dashboard_fe.git
cd Dashboard_fe
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Update `.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

Start development server:

```bash
npm run dev
```

The app will run at:

```txt
http://localhost:5173
```

---

## Main Routes

### Public Routes

```txt
/login
```

### Admin Routes

```txt
/admin
/admin/products
/admin/orders
/admin/customers
```

### User Routes

```txt
/user
/user/orders
/user/wishlist
/user/addresses
/user/profile
```

---

## API Endpoints Used

### Auth APIs

```txt
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
```

### Admin APIs

```txt
GET    /api/admin/products
POST   /api/admin/products
PUT    /api/admin/products/{id}
DELETE /api/admin/products/{id}

GET    /api/categories

GET    /api/admin/orders
GET    /api/admin/orders/{id}
PUT    /api/admin/orders/{id}/status

GET    /api/admin/users
GET    /api/admin/users/{id}
PUT    /api/admin/users/{id}/role
```

### User APIs

```txt
GET    /api/orders
GET    /api/orders/{id}
PUT    /api/orders/{id}/cancel

GET    /api/wishlist
POST   /api/wishlist/items
DELETE /api/wishlist/items/{productId}
DELETE /api/wishlist

GET    /api/users/me/addresses
POST   /api/users/me/addresses
PUT    /api/users/me/addresses/{id}
PATCH  /api/users/me/addresses/{id}/default
DELETE /api/users/me/addresses/{id}

GET    /api/products
```

---

## Current Status

### Completed

- Real login and logout flow.
- Protected routes by role.
- Admin overview with backend data.
- Admin product CRUD.
- Admin order management.
- Admin user/customer management.
- User order page.
- User wishlist page.
- User address CRUD.
- User profile display.
- Shared API services with Axios.
- Basic loading, empty, and error states.
