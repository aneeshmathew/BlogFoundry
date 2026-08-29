# BlogPlatform

BlogPlatform is a modern, full-stack content publishing application designed for creators, writers, and readers. Built using the robust MERN stack, it offers a seamless digital publishing experience paired with a sleek, dark-themed user interface optimized for long-form readability and cross-device responsiveness.

Core Features

    Secure Authentication: User sign-up and login workflows that authenticate authors, enabling personalized content ownership and account management.

    Content Management System (CMS): Comprehensive tools for creating, editing, managing drafts, and publishing blog posts dynamically.

    Organization & Discovery: Advanced categorization and tagging systems that group related articles to help readers navigate content effortlessly.

    Responsive Dark-Themed UI: A clean, distraction-free interface engineered with a dark color palette to reduce eye strain and provide an immersive reading environment across mobile, tablet, and desktop viewports.

Technology Stack

    Frontend: React for building a dynamic, component-driven single-page application interface.

    Backend: Node.js and Express.js powering the RESTful API server, handling middleware, and processing business logic.

    Database: MongoDB for flexible, document-based storage of user credentials, blog documents, categories, and tags.

Engineering Highlights

    Structured RESTful architecture ensuring clean data flow and separation of concerns between client and server layers.

    Scalable database schema design capable of handling rapid relational lookups between users, posts, and taxonomy tags.

    Modular codebase organization optimized for future expansion, such as adding comment systems, media uploads, or search indexing.


## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, React Router, Tailwind CSS, react-hot-toast, lucide-react |
| Backend  | Node.js, Express, Mongoose |
| Database | MongoDB (local or Atlas) |
| Testing  | Mocha, Chai, chai-http |

## Project Structure

```
Blog-Foundry-main/
├── backend/
│   ├── app.js                 # Express app entrypoint
│   ├── config/database.js     # MongoDB connection
│   ├── controllers/           # Route handlers (auth, posts)
│   ├── models/                # Mongoose schemas (User, Post)
│   ├── routes/                # API route definitions
│   ├── utils/seed.js          # Database seeding script
│   └── data/                  # Seed data (users, posts)
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/AuthContext.js  # Auth state management
│   │   ├── pages/              # Route-level pages
│   │   └── utils/api.js        # API client
│   └── public/
├── api/index.js               # Vercel serverless entrypoint
└── package.json                # Root scripts (runs both apps together)
```

## Prerequisites

- Node.js 18+
- npm
- A MongoDB instance — either a local `mongod` install or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## Getting Started

### 1. Install dependencies

From the project root, this installs dependencies for the root, backend, and frontend:

```bash
npm install
./setup.sh
```

### 2. Configure environment variables

Create a `.env` file inside `backend/` (use `backend/.env.example` as a reference):

```env
# MongoDB Atlas connection string (or a local mongodb:// URI)
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/BlogPlatform?retryWrites=true&w=majority

# Comma-separated allowed frontend origins for CORS
FRONTEND_URL=http://localhost:8000
```

Optionally, create a `.env` file inside `frontend/` (use `frontend/.env.example` as a reference) if your backend isn't running on the default local port:

```env
REACT_APP_API_URL=http://localhost:8080
```

### 3. Seed the database (optional but recommended)

Populates the database with sample users and posts:

```bash
npm run seed
```

This creates several demo accounts (see `backend/data/users.js`), including:

```
Email:    john@example.com
Password: password123
```

### 4. Run the app

Starts both the backend (port 8080) and frontend (port 8000) together:

```bash
npm start
```

- Frontend: http://localhost:8000
- Backend API: http://localhost:8080

You can also run each side independently:

```bash
npm run backend   # backend only, with nodemon auto-reload
npm run frontend  # frontend only
```

### 5. Run tests

```bash
npm run test:task1
```

## Using the App

New users can create an account from the **Sign Up** page (linked from the login screen), or sign in with one of the seeded demo accounts. Once logged in, you can browse all published posts, view an individual post, create your own posts, and manage the posts you've authored from **My Posts**.

## API Overview

All endpoints are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint    | Description                    | Auth required |
|--------|-------------|---------------------------------|----------------|
| POST   | `/login`    | Log in with email + password    | No |
| POST   | `/register` | Create a new account            | No |
| GET    | `/me`       | Get the current user's profile  | Yes (`x-user-id` header) |

**Register — request body**
```json
{
  "name": "string",       // Required
  "email": "string",      // Required, must be unique
  "password": "string"    // Required, min 6 characters
}
```

**Login — request body**
```json
{
  "email": "string",
  "password": "string"
}
```

Both endpoints return the created/authenticated user profile on success:
```json
{
  "message": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string",
    "bio": "string",
    "createdAt": "ISO string",
    "updatedAt": "ISO string"
  }
}
```

> Authenticated requests identify the user via an `x-user-id` header containing their MongoDB `_id`, set automatically by the frontend after login/signup.

### Posts — `/api/posts`

| Method | Endpoint      | Description                          | Auth required |
|--------|---------------|---------------------------------------|----------------|
| GET    | `/`           | List all published posts              | No |
| GET    | `/my-posts`   | List posts authored by the current user | Yes |
| GET    | `/:id`        | Get a single post                     | No |
| POST   | `/`           | Create a new post                     | Yes |
| PUT    | `/:id`        | Update a post                         | Yes |
| DELETE | `/:id`        | Delete a post                         | Yes |

**Create/update post — request body**
```json
{
  "title": "string",        // Required
  "content": "string",      // Required
  "excerpt": "string",      // Optional: short description
  "category": "string",     // Required: one of the categories listed above
  "tags": ["string"],       // Optional
  "readTime": "number"      // Optional: estimated read time in minutes
}
```

**Create post — success response**
```json
{
  "message": "Post created successfully",
  "post": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "excerpt": "string",
    "category": "string",
    "tags": ["string"],
    "readTime": "number",
    "published": true,
    "author": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "bio": "string"
    },
    "createdAt": "ISO string",
    "updatedAt": "ISO string"
  }
}
```

## Resetting the Database

To restore the database to its seeded state, re-run:

```bash
npm run seed
```

Running the test suite (`npm run test:task1`) also re-seeds the database automatically before executing.

## Deployment

This project is set up for deployment on [Vercel](https://vercel.com) — see the `vercel.json` files in the root, `backend/`, and `frontend/` directories. Set `MONGODB_URI` and `FRONTEND_URL` as environment variables on the backend deployment, and `REACT_APP_API_URL` on the frontend deployment.
