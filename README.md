# Bloom Website

A production-grade website for **Bloom** — a student-led social impact initiative from Maxfort School, Delhi, empowering children through education, mentorship, and creative opportunities.

## 🚀 Project Overview

This is a high-performance, full-stack Next.js application built with a focus on speed, scalability, and ease of content management. It features a custom multi-level administrative system and optimized rendering strategies for a seamless user experience.

- **Frontend**: Next.js 15+ (App Router), TypeScript, Tailwind CSS.
- **Backend**: Next.js API Routes, MongoDB with Mongoose.
- **Rendering**: Optimized mix of Static Site Generation (SSG), Incremental Static Regeneration (ISR), and React Server Components (RSC).
- **Admin System**: Comprehensive multi-level dashboard for managing blogs, admin accounts, and site metrics.

## 🛠 Tech Stack

- **Framework**: Next.js 15.5+
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Optimized utility-first styling)
- **Database**: MongoDB Atlas
- **Auth**: JWT with `bcryptjs` for secure password hashing
- **Performance**: Sharp (image optimization), Skeleton Loaders, Lazy Loading.

## ✨ Key Features & Optimizations

### 🏎 Performance

- **Server Components**: All primary landing pages and UI components are Server Components, reducing client-side JS and improving TTI.
- **ISR (Incremental Static Regeneration)**: The Blog system uses ISR (1-hour revalidation) to deliver static speeds with dynamic freshness.
- **Skeleton Loaders**: Integrated across all data-fetching routes to eliminate layout shifts and improve perceived speed.
- **LCP Optimization**: Critical above-the-fold images use priority loading; all others are lazy-loaded.

### 🔐 Multi-Level Admin Panel

Access the dashboard at `/admin`.

- **Super Admin**: Central control account (Master) capable of managing other admin accounts and roles.
- **Admin/Editor/Viewer**: Scoped roles for content management, volunteer review, and impact tracking.
- **CRUD UI**: Complete web interface for managing blog posts and administrative access.

## ⚙️ Getting Started

### Prerequisites

- Node.js 18.17+
- MongoDB instance (Atlas recommended)
- npm or yarn

### 1. Installation

```bash
git clone https://github.com/bloommsd26-dev/Bloom-Website.git
cd bloom-website
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_strong_jwt_secret
ADMIN_EMAIL=bloom.msd26@gmail.com
ADMIN_PASSWORD=your_secure_password
ADMIN_USERNAME=bloom_master
```

_Note: The environment-based admin is automatically granted `super_admin` status._

### 3. Database Seeding

Initialize the database with focus area programs, impact metrics, and initial admin accounts:

```bash
npm run seed:db
```

### 4. Run Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the site and `http://localhost:3000/admin` to manage it.

## 📂 Directory Structure

- `app/`: Next.js App Router (pages, layouts, and loading states).
- `app/api/`: Backend API endpoints (Admin CRUD, Auth, Public Data).
- `app/components/`: Reusable UI, layout, and specialized card components.
- `lib/`: Core logic including database connection, Mongoose models, and auth utilities.
- `public/`: Static assets and SEO files.
- `scripts/`: Maintenance and seeding scripts.

## 🛠 Development Workflow

### Scripts

- `npm run build`: Production build and optimization.
- `npm run lint`: Run ESLint to ensure code quality.
- `npm run type-check`: Verify TypeScript integrity.
- `npm run format`: Prettify codebase.

### Admin Management

- To create a new admin, log in as a **Super Admin**, navigate to the **Admin Accounts** tab, and fill in the details.

## 🚢 Deployment (Vercel)

1. Connect your GitHub repository to Vercel.
2. Add your `.env.local` variables to the Vercel Project Settings.
3. Deploy. Vercel will automatically handle the build and ISR caching.

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feat/your-feature`).
2. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/).
3. Push to the branch (`git push origin feat/your-feature`).
4. Open a Pull Request.

---

**Bloom** — _Not charity. A weekly promise._
Developed with ❤️ by the Bloom Tech Team.
