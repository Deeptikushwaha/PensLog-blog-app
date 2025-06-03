# PensLog

**PensLog** is a modern blogging platform designed for developers and writers who want a sleek, fast, and minimal space to log their thoughts — inspired by `console.log` but made for humans.

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Cloudflare Workers + Hono
- **Validation**: Zod
- **ORM**: Prisma (with connection pooling)
- **Database**: PostgreSQL
- **Auth**: JWT
- **Styling**: Tailwind CSS

---

## 🚧 Project Status

Currently in active development. Basic structure is being set up — APIs, authentication, and core features coming soon.

Backend is up - https://backend.deeptikushwaha140.workers.dev/

---

## 📦 Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Cloudflare account (for deployment)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:

   ```
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_jwt_secret"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Update the `config.ts` file with your backend URL:

   ```typescript
   export const SERVER_URL = "your_backend_url";
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔌 API Endpoints

### Authentication

#### Sign Up

- **POST** `/api/v1/user/signup`
- **Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token

#### Sign In

- **POST** `/api/v1/user/signin`
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token and user details

### Blogs

#### Get All Blogs

- **GET** `/api/v1/blog/bulk`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of blog posts

#### Create Blog

- **POST** `/api/v1/blog`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "string",
    "content": "string"
  }
  ```
- **Response**: Created blog ID

#### Get Blog by ID

- **GET** `/api/v1/blog/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Blog post details

#### Update Blog

- **PUT** `/api/v1/blog`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "id": "string",
    "title": "string",
    "content": "string"
  }
  ```
- **Response**: Updated blog ID

---

## 🔒 Authentication

All API endpoints (except signup and signin) require a valid JWT token in the Authorization header:

---

## 🚀 Deployment

### Backend

The backend is deployed on Cloudflare Workers. To deploy:

1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```
2. Deploy:
   ```bash
   npm run deploy
   ```

### Frontend

The frontend can be deployed to any static hosting service (Vercel, Netlify, etc.).

---

## 💡 Features

- User authentication
- Create, read, update blogs
- Responsive design
- Real-time updates
- Markdown support (coming soon)
- Image upload (coming soon)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💡 Vision

Inspired by medium. PensLog aims to blend the simplicity of personal blogging with the structure and familiarity of a developer's console.  
Write, log, and share — all in a smooth, distraction-free experience.

---

> ✨ More features and improvements are in development. Stay tuned!
