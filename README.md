# BlogFoundry — Frontend

React frontend for BlogFoundry, a full-stack content publishing app. This repo contains the client only — the API lives in a separate [`blogfoundry-backend`](../blogfoundry-backend) repo.

## Tech Stack

React 18, React Router, Tailwind CSS, react-hot-toast, lucide-react (CRA / `react-scripts`).

## Prerequisites

- Node.js 18+
- npm
- The [backend](../blogfoundry-backend) running somewhere reachable (locally or deployed)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (use `.env.example` as a reference):

```env
# URL of the running backend API (no trailing slash)
REACT_APP_API_URL=http://localhost:8080
```

If you leave this unset, the app falls back to same-origin in production, or
swaps port `8000` → `8080` on `localhost` in development
(see `src/utils/baseURL.js`). Setting `REACT_APP_API_URL` explicitly is
recommended once frontend and backend are deployed as separate services.

### 3. Run the app

```bash
npm start
```

Runs on [http://localhost:8000](http://localhost:8000) (port fixed via the `start` script).

### 4. Build for production

```bash
npm run build
```

Outputs to `build/`.

## Deployment

Set up as an independent [Vercel](https://vercel.com) project — see `vercel.json`
(SPA rewrite to `index.html`). Set `REACT_APP_API_URL` as an environment variable
on the deployment, pointing at your deployed backend.

## Project Structure

```
blogfoundry-frontend/
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/AuthContext.js  # Auth state management
│   ├── pages/                 # Route-level pages
│   └── utils/
│       ├── api.js             # API client
│       └── baseURL.js         # Resolves the backend base URL
├── public/
└── vercel.json                # SPA rewrite rules
```

## API Contract

This app expects a backend exposing (see the backend repo's README for full details):

- `POST /api/auth/login`, `POST /api/auth/register`, `GET /api/auth/me`
- `GET /api/posts`, `GET /api/posts/my-posts`, `GET /api/posts/:id`,
  `POST /api/posts`, `PUT /api/posts/:id`, `DELETE /api/posts/:id`

Authenticated requests send an `x-user-id` header, set automatically after login/signup.
