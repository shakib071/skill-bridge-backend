![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express-5-green)
![Prisma](https://img.shields.io/badge/Prisma-7-lightblue)


# SkillBridge Backend

Backend system for **SkillBridge**, a tutor–student booking platform.
This backend provides authentication, tutor availability management, booking system, and role-based dashboards.
Built with **Node.js**, **Express.js**, **TypeScript**, **Prisma**, and **PostgreSQL**. Authentication handled by **better-auth** with session-based auth and Google OAuth support.

---

## 🌐 Live Demo

| | URL |
|--|-----|
| **Frontend** | [https://skill-bridge-eight-cyan.vercel.app](https://skill-bridge-eight-cyan.vercel.app) |
| **Backend API** | [https://skillbridges-ten.vercel.app](https://skillbridges-ten.vercel.app) |

---


## 🔗 Repositories

| | URL |
|--|-----|
| **Frontend** | [github.com/shakib071/skill-bridge-frontend](https://github.com/shakib071/skill-bridge-frontend) |
| **Backend** | [github.com/shakib071/skill-bridge-backend](https://github.com/shakib071/skill-bridge-backend) |

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Secure login & registration via better-auth
- Cookie-based session management
- Role-based access control — `ADMIN`, `STUDENT`, `TUTOR`
- Google OAuth support
- Banned & suspended user protection

### 👨‍🎓 Student Features
- Browse and filter tutors
- Book tutor sessions
- View upcoming & completed sessions
- Leave reviews after completed sessions
- Dashboard overview statistics

### 👨‍🏫 Tutor Features
- Create & update tutor profile
- Set weekly availability slots
- Availability conflict detection
- View booked sessions from students
- Dashboard overview statistics

### 👑 Admin Features
- Platform-wide overview dashboard
- View & manage all users
- Ban / suspend users
- Feature tutors on the platform

### 📅 Booking System
- Create bookings with availability validation
- Track booking status — `CONFIRMED`, `COMPLETED`, `CANCELLED`
- Automatic session duration calculation
- Automatic price calculation based on hourly rate

### ⭐ Review System
- Students can review completed sessions
- Per-tutor review aggregation
- Rating system

### 📊 Dashboard Analytics
- Upcoming sessions count
- Completed sessions count
- Unique tutors / students interacted count

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Runtime** | Node.js | 20+ |
| **Framework** | Express.js | v5 |
| **Language** | TypeScript | v5 |
| **Database** | PostgreSQL | - |
| **ORM** | Prisma | v7 |
| **DB Adapter** | @prisma/adapter-pg | v7 |
| **Authentication** | better-auth | v1.4 |
| **Email** | Nodemailer | v7 |
| **CORS** | cors | v2 |
| **Environment** | dotenv | v17 |
| **Bundler** | tsup | v8 |
| **Dev Runner** | tsx | v4 |
| **Deployment** | Vercel | - |

---

## 📁 Project Structure

```
backend/
│
├── prisma/
|   ├──schema/
│     ├── schema.prisma
│     ├── auth.prisma
│     ├── availability.prisma
│     ├── booking.prisma
│     ├── category.prisma
│     ├── reviews.prisma
│     └── tutorProfile.prisma
│
├── src/
│   ├── types/
│   ├── scripts/
│   |   └── seedAdmin.ts
│   ├── modules/
│   |   ├── user/
│   |   ├── tutor/
│   |   ├── availability/
│   |   ├── booking/
│   |   ├── review/
│   |   ├── category/
│   |   └── admin/
│   ├── middleware/
|   |    ├──auth.ts
|   |    ├──globalErrorHandler.ts
|   |    └──notFound.ts
│   ├── lib/
|   |    ├──auth.ts
|   |    └──prisma.ts
│   ├── app.ts
│   └── server.ts
│
│
├── .env
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

---

## 🗄 Database Models

* User
* TutorProfile
* Bookings
* Category
* Availability
* Reviews

---

## 🔒 Security

* Secure cookie-based authentication
* Role-based authorization
* Session validation
* Protected routes
* Banned user protection

---

## 🔗 API Endpoints

### 🔐 Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/sign-in/email` | Public |
| POST | `/api/auth/sign-up/email` | Public |
| POST | `/api/auth/sign-out` | Public |
| POST | `/api/auth/sign-in/social` | Public |
| GET | `/api/auth/get-session` | Public |
| POST | `/api/auth/forget-password` | Public |
| POST | `/api/auth/reset-password` | Public |
| GET | `/api/auth/verify-email` | Public |

### 👤 User
| Method | Endpoint | Access |
|--------|----------|--------|
| PUT | `/api/user/` | STUDENT, TUTOR |
| GET | `/api/user/get-all-users` | ADMIN |
| PATCH | `/api/user/update-user-status/:id` | ADMIN |
| GET | `/api/user/overview/:id` | STUDENT |

### 👨‍🏫 Tutor
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/tutor/` | TUTOR |
| GET | `/api/tutor/` | Public |
| GET | `/api/tutor/profile/:id` | TUTOR |
| GET | `/api/tutor/tutor-self-profile` | TUTOR |
| PUT | `/api/tutor/update-profile/:id` | TUTOR |
| PATCH | `/api/tutor/update-isfeatured/:id` | ADMIN |
| GET | `/api/tutor/overview/:id` | TUTOR |

### 📅 Availability
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/availability/` | TUTOR |
| GET | `/api/availability/` | TUTOR |
| DELETE | `/api/availability/:id` | TUTOR |
| GET | `/api/availability/without-booked/:id` | Public |

### 📋 Booking
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/booking/` | STUDENT |
| GET | `/api/booking/sessions` | STUDENT, TUTOR |
| GET | `/api/booking/get-all-bookings` | ADMIN |
| GET | `/api/booking/get-completed-bookings` | STUDENT |
| PATCH | `/api/booking/update-booking-status/:id` | STUDENT, TUTOR |

### ⭐ Review
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/review/create` | STUDENT |
| GET | `/api/review/get-reviews/:id` | Public |

### 🏷 Category
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/category/` | Public |
| POST | `/api/category/` | ADMIN |

### 👑 Admin
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/admin/overview` | ADMIN |

---


## 🗄 Database Schema

### Models
- **User** — id, name, email, role, status, phone, profile_image
- **TutorProfile** — bio, hourly_rate, subjects, languages, experienceYears, education, isFeatured
- **Availability** — day, startTime, endTime, isBooked
- **Bookings** — start_time, end_time, duration, total_price, status
- **Reviews** — rating, comment
- **Category** — name, description

### Enums
| Enum | Values |
|------|--------|
| `Role` | `STUDENT`, `TUTOR`, `ADMIN` |
| `UserStatus` | `ACTIVE`, `BANNED`, `SUSPENDED` |
| `Status` | `CONFIRMED`, `COMPLETED`, `CANCELLED` |
| `Days` | `MONDAY` ... `SUNDAY` |

---

## 🔐 Environment Variables

```env
DATABASE_URL=              # PostgreSQL connection string
BETTER_AUTH_SECRET=        # Random secret key
BETTER_AUTH_URL=           # Backend base URL e.g. http://localhost:5000
APP_URL=                   # Frontend base URL e.g. http://localhost:3000
GOOGLE_CLIENT_ID=          # Google OAuth client ID (optional)
GOOGLE_CLIENT_SECRET=      # Google OAuth client secret (optional)
ADMIN_NAME=                # Seed admin display name
ADMIN_EMAIL=               # Seed admin email
ADMIN_PASSWORD=            # Seed admin password
NODE_ENV=development (or production)
```

---

### Installation

```bash
# Clone the repo
git clone https://github.com/shakib071/skill-bridge-backend.git
cd skill-bridge-backend

# Install dependencies
npm install

# Set up environment variables
  .env

# Push schema to database
npx prisma migrate dev --name init
npx prisma generate

# Seed admin user
npm run seed:admin

# Start dev server
npm run dev
```

---


## 📜 Scripts
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run seed:admin` | Seed admin user |
| `npm run postinstall` | Auto-generate Prisma client |


## 🚀 Deployment

Deployed on **Vercel** using `@vercel/node` to serve Express as a serverless function.

**`vercel.json`:**
```json
{
  "version": 2,
  "builds": [{ "src": "api/server.mjs", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.)*", "dest": "/api/server.mjs" }]
}
```

**Build command in `package.json`:**
```json
"build": "prisma generate && tsup src/server.ts --format esm --platform node --target node20 --outDir api --external pg-native"
```

> `tsup` compiles `server.ts` into `api/server.mjs` which Vercel picks up as the serverless entry point.

---



## 👨‍💻 Author

**Shakib Hasan**
[![GitHub](https://img.shields.io/badge/GitHub-shakib--hasan-black?logo=github)](https://github.com/shakib071)
[![Email](https://img.shields.io/badge/Email-shakibhasan071@gmail.com-red?logo=gmail)](mailto:shakibhasan071@gmail.com)

SkillBridge Project
Bangladesh

---

```
