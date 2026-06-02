# Bloom Website

A production-grade website for Bloom — a student-led social impact initiative empowering children through education, mentorship, and creative opportunities.

## Project Overview

This is a full-stack Next.js application with:

- **Frontend**: Next.js 15+ with App Router, TypeScript, React Server Components, Tailwind CSS
- **Backend**: Next.js API routes with MongoDB integration
- **CMS**: Custom admin panel for managing content (blogs, programs, donations, volunteers, impact)
- **Database**: MongoDB with Mongoose
- **SEO**: Full metadata, OpenGraph, JSON-LD structured data, sitemap generation
- **Security**: Authentication, authorization, password hashing, CSRF protection

## Tech Stack

### Frontend

- Next.js 15+
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- React Hook Form + Zod (for form validation)

### Backend

- Next.js API Routes
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (for password hashing)

### Tools & Services

- Vercel (recommended for deployment)
- MongoDB Atlas (for database)
- Environment variables for configuration

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or MongoDB Atlas)
- Git

### 1. Clone Repository

```bash
git clone <repository-url>
cd bloom-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with:

- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A strong random string for JWT signing
- `ADMIN_EMAIL` & `ADMIN_PASSWORD`: Initial admin credentials (change immediately after first login)
- Other configuration as needed

### 4. Database Setup

Initialize the database with seed data:

```bash
npm run seed:db
```

This script will:

- Connect to MongoDB
- Create initial admin user
- Seed programs, blog posts, and impact data
- Create necessary indexes

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bloom-website/
├── app/
│   ├── api/                    # API routes
│   │   ├── admin/
│   │   ├── blogs/
│   │   ├── programs/
│   │   ├── donations/
│   │   ├── volunteers/
│   │   ├── contact/
│   │   └── auth/
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   ├── sections/           # Page sections
│   │   ├── cards/              # Card components
│   │   ├── forms/              # Form components
│   │   └── dashboard/          # Admin dashboard components
│   ├── [routes]/               # Page routes
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── lib/
│   ├── db/                     # Database connection
│   ├── models/                 # MongoDB schemas
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   │   ├── helpers.ts
│   │   ├── auth.ts
│   │   ├── api-response.ts
│   │   └── seo.ts
├── public/                     # Static assets
├── .env.example                # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## Key Features

### Pages

- **Home** (`/`): Hero, impact stats, programs overview, CTA
- **About** (`/about`): Mission, vision, values, story
- **Programs** (`/programs`): Five focus areas with detailed information
- **Blog** (`/blog`): Blog posts with categories and search
- **Impact** (`/impact`): Impact metrics and stories
- **Volunteer** (`/volunteer`): Volunteer application form
- **Donate** (`/donate`): Donation campaigns and drive information
- **Contact** (`/contact`): Contact form and FAQs

### Admin Features

- Secure authentication and session management
- Blog CMS: create, edit, delete posts
- Program management
- Donation campaign tracking
- Volunteer application review
- Impact metrics dashboard
- Media manager for image uploads

## API Documentation

### Authentication

All admin routes require JWT authentication via `Authorization: Bearer <token>` header.

### Public Endpoints

- `GET /api/blogs` - List published blogs
- `GET /api/blogs/:slug` - Get blog by slug
- `GET /api/programs` - List programs
- `GET /api/programs/:slug` - Get program by slug
- `POST /api/volunteers` - Submit volunteer application
- `POST /api/contact` - Submit contact form
- `GET /api/impact` - Get impact metrics

### Admin Endpoints (Protected)

- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/blogs` - List all blogs
- `POST /api/admin/blogs` - Create blog
- `PUT /api/admin/blogs/:id` - Update blog
- `DELETE /api/admin/blogs/:id` - Delete blog
- `GET /api/admin/volunteers` - View volunteer applications
- `PUT /api/admin/volunteers/:id` - Update volunteer status
- `POST /api/admin/impact` - Update impact metrics

## Security Checklist

Before deployment, verify:

- [ ] All environment variables set in production
- [ ] `JWT_SECRET` is a strong, random string (minimum 32 characters)
- [ ] Database password is strong and not in code
- [ ] Admin credentials are changed immediately after setup
- [ ] HTTPS enforced in production
- [ ] CORS configured appropriately
- [ ] Rate limiting enabled on API endpoints
- [ ] Input validation on all endpoints
- [ ] No sensitive data in client bundle
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Dependency vulnerabilities checked: `npm audit`

## Performance Optimization

- Image optimization with Next.js Image component
- Dynamic imports for code splitting
- Lazy loading for below-the-fold content
- MongoDB indexes on frequently queried fields
- Browser caching with Cache-Control headers
- Minified CSS and JavaScript in production

Target Lighthouse scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Vercel automatically builds and deploys

```bash
npm run build
npm run start
```

### Self-Hosted

1. Ensure Node.js 18+ is installed
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Set environment variables
5. Start server: `npm run start`
6. Use PM2 or similar for process management

## Database Seeding

Run initial seed to populate database:

```bash
npm run seed:db
```

To reseed (clears existing data):

```bash
npm run seed:db -- --force
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Type check
npm run type-check

# Format code
npm run format

# Check formatting
npm run format:check

# Seed database
npm run seed:db
```

## Code Quality

- TypeScript strict mode enabled
- ESLint with Next.js recommended rules
- Prettier for code formatting
- Pre-commit hooks (configure with husky)

## Git Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and commit: `git commit -m "type(scope): description"`
3. Push branch: `git push origin feature/name`
4. Create Pull Request

Commit message format:

```
type(scope): description

feat(programs): add new program management
fix(blog): correct slug generation
docs(readme): update setup instructions
```

## Contributing

1. Follow the code style and conventions
2. Write meaningful commit messages
3. Add comments for complex logic
4. Test changes before submitting PR
5. Ensure no console errors/warnings

## Troubleshooting

### MongoDB Connection Issues

- Verify `MONGODB_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Rebuild
npm run build
```

## Support & Questions

For issues or questions:

1. Check existing GitHub issues
2. Create new issue with detailed description
3. Contact: hello@bloom.org

## License

[Specify your license here]

## Changelog

### v1.0.0 (Initial Release)

- Complete website build
- All pages implemented
- Basic CMS setup
- Authentication system
- SEO optimization
