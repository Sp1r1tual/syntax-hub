## SyntaxHub </>

**An interactive online learning platform for programming** – structured lessons, topic-focused questions, and clear explanations to make coding intuitive.

---

![SyntaxHub](https://naqhdzpocsklzkhutzwc.supabase.co/storage/v1/object/sign/syntax-hub/news/syntax-hub-page.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xZDFhZmE1NS00MzFhLTQxMDgtOTE0ZS02NTcxMmE0YjZkNGIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzeW50YXgtaHViL25ld3Mvc3ludGF4LWh1Yi1wYWdlLnBuZyIsImlhdCI6MTc2OTEzNzkxMiwiZXhwIjo0ODkxMjAxOTEyfQ.iu5MuIXsertidvFMX7WGCzSEMLgE68jg3O1ljQb_6yU)

---

## About the Project

SyntaxHub was created in response to the need of students and beginners in programming to access information in a structured and interactive way. The platform combines educational courses with practical exercises and explanations, drawing inspiration from resources like [JavaScript.info](https://uk.javascript.info/)

The project has served as a testing ground for experimenting with UX/UI design, interactive components, and a content management system for learning. Its goal is to create a flexible tool that allows users to learn quickly, test their knowledge, and revisit material without losing context.

---

## Features

- 🧭 Programming Courses – structured programming courses in text format
- 🧑‍💻 User Profiles – profiles with the ability to edit name, socials and avatar
- 🎨 Light & Dark Theme – light and dark modes with instant switching
- 🔐 Authentication – JWT-based authentication with Google OAuth
- 💬 Comments – comments for courses, questions, and news with image uploads via paste and drag & drop
- 📰 News Page – dedicated project news section
- ❤️ Likes – likes comments, and news

---

## Tech Stack

### Frontend

- TypeScript
- React
- TanStack Query
- Axios
- Zustand
- React Router
- React Error Boundary
- React Loading Skeleton
- React Markdown

### Backend

- TypeScript
- NestJS
- Supabase (PostgreSQl)
- Upstash (Redis)
- Passport Google Oauth20
- Passport JWT
- Cloudinary
- Zod

**Architecture**: Client ↔ Server ↔ Database

---

## Future Plans

- **Complete UI overhaul** – modernize the interface, as the current design is quite basic
- **Optimization** – improve platform performance and efficiency.
- **Documentation** – provide complete, detailed guides for users and developers.
- **Admin Panel & Roles** – implement admin interface with user roles and permissions.
- **AI-Powered Interviews** – generate interactive coding interviews based on the theory the user has completed.
- **Exclusive Paid Content** – offer premium resources for subscribers.
- **Mentor Profiles** – allow users to register as mentors on the platform through a completed application form.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sp1r1tual/syntax-hub.git
```

### Server

### 2. Navigate to server directory

```bash
cd server
```

### 3. Install dependencies

```bash
yarn install
```

### 4. Create a local PostgreSQL database

```bash
psql -U postgres -c "CREATE DATABASE app_db;"
```

### 5. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

For local development, set `DATABASE_URL` to your local PostgreSQL instance:

```dotenv
PORT=5000
CLIENT_URL=http://localhost:5173
API_URL=http://localhost:5000

# Local PostgreSQL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app_db

# Upstash Redis — create a free instance at https://upstash.com
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Google OAuth — create credentials at https://console.cloud.google.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=15m

# Cloudinary — create a free account at https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 6. Run database migrations

```bash
yarn prisma:migrate
```

### 7. Seed the database

```bash
yarn prisma:seed
```

### 8. Generate Prisma client

```bash
yarn prisma:generate
```

### 9. Start the development server

```bash
yarn dev
```

The server will be available at `http://localhost:5000`.

### Client

### 10. Create a new terminal and navigate to client directory

```bash
cd client
```

### 11. Install dependencies

```bash
yarn install
```

### 12. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```dotenv
VITE_API_URL=http://localhost:5000
```

#### 13. Start the client

```bash
yarn dev
```

The client will be available at `http://localhost:5173`.

---

## License

Currently, this project does not include a formal license.
All rights are reserved by the author.

If you plan to use, modify, or distribute this project, please contact the author for permission.
