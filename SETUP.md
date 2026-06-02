# Bloom Website - Quick Start Guide

This is a production-ready Next.js website for Bloom — a student-led social impact initiative.

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bloom
```

### 3. Seed the Database

```bash
npm run seed:db
```

This creates:

- Admin user
- 5 Programs
- 3 Sample blog posts
- Impact metrics
- Testimonials

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 5. Access Admin Panel

- Email: `admin@bloom.org`
- Password: From your `.env.local`
- Admin routes will be at `/admin` (setup in next phase)

## 📁 Key Files

- `app/page.tsx` - Home page
- `app/about/page.tsx` - About us
- `app/programs/page.tsx` - All programs
- `app/blog/page.tsx` - Blog listing
- `app/volunteer/page.tsx` - Volunteer form
- `lib/models/` - Database schemas
- `public/robots.txt` - SEO configuration

## 🔐 Security

Before going to production:

1. Change admin password immediately:
   - Login with default credentials
   - Create new admin user with strong password
   - Delete default admin user

2. Set strong environment variables:
   - `JWT_SECRET` - Long random string (min 32 chars)
   - `MONGODB_URI` - Use MongoDB Atlas with password

3. Configure HTTPS in production

4. Enable CORS only for trusted domains

5. Set up rate limiting on API endpoints

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with `npm run build`

### Self-Hosted

```bash
npm install
npm run build
npm start
```

## 📚 Documentation

Full setup and deployment guide: See [README.md](./README.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run: `npm run type-check && npm run lint`
4. Push and create Pull Request

## 🐛 Troubleshooting

### Port 3000 in use

```bash
npx kill-port 3000
```

### MongoDB connection error

- Check MONGODB_URI in .env.local
- Verify IP whitelist in MongoDB Atlas
- Ensure credentials are correct

### Build errors

```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📞 Support

- Email: hello@bloom.org
- Issues: Create GitHub issue

## 📋 Features

✅ Responsive design (mobile, tablet, desktop)
✅ Dark mode ready (theme variables in Tailwind)
✅ SEO optimized (metadata, OpenGraph, schemas)
✅ MongoDB integration
✅ Admin authentication
✅ Blog CMS
✅ Volunteer management
✅ Impact tracking
✅ Contact forms
✅ TypeScript strict mode
✅ Security headers

## 🎯 Next Steps

1. [ ] Update logo and branding colors
2. [ ] Add real images for programs
3. [ ] Write more blog posts
4. [ ] Configure email for form submissions
5. [ ] Build admin dashboard UI
6. [ ] Set up image upload (Cloudinary or AWS S3)
7. [ ] Add payment processing for donations
8. [ ] Deploy to Vercel
9. [ ] Set up analytics (Google Analytics, Plausible)
10. [ ] Configure custom domain

## ✨ Technologies

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **Authentication**: JWT
- **UI Components**: Custom built
- **Form Handling**: React Hook Form + Zod
- **Animations**: Framer Motion

## 📦 Project Structure

```
bloom/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── components/      # React components
│   ├── [routes]/        # Pages
│   └── globals.css      # Global styles
├── lib/                 # Utilities and database
│   ├── models/          # MongoDB schemas
│   ├── utils/           # Helper functions
│   └── types/           # TypeScript types
├── public/              # Static files
├── scripts/             # Setup scripts
└── [config files]       # Next.js, Tailwind, etc.
```

---

**Built with ❤️ for Bloom**
