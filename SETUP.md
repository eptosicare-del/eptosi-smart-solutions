# Eptosi Smart Solutions — Complete Setup Guide

## Stack Overview
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + custom CSS |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Email | Resend |
| Deployment | Vercel (free tier) |
| Language | TypeScript |

---

## 1. Prerequisites

- Node.js 18+ installed
- A [Supabase](https://supabase.com) account (free)
- A [Resend](https://resend.com) account (free — 3,000 emails/month)
- A [Vercel](https://vercel.com) account (free)
- A domain you own (for production email with Resend)

---

## 2. Local Development Setup

### 2a. Install dependencies
```bash
cd eptosi-smart-solutions
npm install
```

### 2b. Create environment file
```bash
cp .env.example .env.local
```
Then fill in all values (see Section 3 below).

### 2c. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 3. Environment Variables

Create `.env.local` with these values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key

# Resend
RESEND_API_KEY=re_your_api_key_here

# Admin Credentials
ADMIN_EMAIL=your-admin-email@gmail.com
ADMIN_PASSWORD=YourStrongPassword123!
ADMIN_JWT_SECRET=a-random-secret-string-at-least-32-characters-long

# App
NEXT_PUBLIC_APP_URL=https://eptosismartsolutions.com
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210

# reCAPTCHA (optional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

---

## 4. Supabase Setup

### 4a. Create a new Supabase project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Name it `eptosi-smart-solutions`
3. Set a strong database password
4. Choose region: **ap-south-1** (Mumbai) for lowest latency in India

### 4b. Run the database schema
1. In your Supabase project → **SQL Editor**
2. Copy the entire contents of `supabase/schema.sql`
3. Paste and click **Run**

### 4c. Get your API keys
1. Go to **Settings → API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this SECRET — server only)

---

## 5. Resend Email Setup

### 5a. Create account
1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys** → Create API Key
3. Copy to `RESEND_API_KEY`

### 5b. Add & verify your domain (required for production)
1. **Domains** → Add Domain → Enter `eptosismartsolutions.com`
2. Add the DNS records shown to your domain registrar (Namecheap/GoDaddy/Cloudflare)
3. Wait for verification (usually < 30 minutes)
4. Update `FROM_EMAIL` in `lib/resend.ts` to `noreply@eptosismartsolutions.com`

> **During development:** You can use Resend's test mode — emails go to `onboarding@resend.dev`. Just change `FROM_EMAIL` temporarily.

---

## 6. Admin Setup

The admin panel is at `/admin/login`.

**Default admin credentials** are set via your environment variables:
- `ADMIN_EMAIL` = your admin email
- `ADMIN_PASSWORD` = your chosen password (use something strong!)
- `ADMIN_JWT_SECRET` = a random 32+ character string (generate at https://generate-secret.vercel.app/32)

**Admin dashboard features:**
- View all inquiries in real-time
- Search by name, email, company, or message
- Filter by status (New / Contacted / Closed)
- Mark inquiries as contacted or closed
- Delete inquiries
- Export all inquiries to CSV
- Click any row to see full details

---

## 7. Vercel Deployment (Free)

### 7a. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Eptosi Smart Solutions website"
git remote add origin https://github.com/your-username/eptosi-smart-solutions.git
git push -u origin main
```

### 7b. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. **Environment Variables** → Add all variables from `.env.local`
5. Click **Deploy**

### 7c. Connect custom domain
1. Vercel → Your Project → **Settings → Domains**
2. Add `eptosismartsolutions.com`
3. Update your DNS: add the CNAME or A records Vercel shows you

---

## 8. WhatsApp Button Setup

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in your environment variables.

Format: country code + number, no spaces or `+`

Example: `919876543210` (for +91 98765 43210)

---

## 9. Adding Your Logo & Favicon

Replace these files in `/public/`:
- `favicon.ico` — browser tab icon
- `favicon-16x16.png` — 16×16 PNG
- `favicon-32x32.png` — 32×32 PNG
- `apple-touch-icon.png` — 180×180 PNG
- `android-chrome-192x192.png` — 192×192 PNG
- `android-chrome-512x512.png` — 512×512 PNG
- `og-image.png` — 1200×630 PNG (social sharing card)
- `logo.png` — your company logo

Use tools like [favicon.io](https://favicon.io) to generate all sizes from one image.

---

## 10. SEO Customization

Update `app/layout.tsx` → `metadata` object:
- Change `title`, `description`, `keywords`
- Update `openGraph` image, url, and description
- Update the JSON-LD structured data with real contact info

---

## 11. Performance Checklist

- [ ] Enable Vercel Edge Network (automatic on free plan)
- [ ] Add `loading="lazy"` to all non-critical images
- [ ] Set up Vercel Analytics (free tier available)
- [ ] Test with [PageSpeed Insights](https://pagespeed.web.dev)
- [ ] Verify mobile responsiveness on real devices

---

## 12. Folder Structure

```
eptosi-smart-solutions/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout + SEO metadata
│   ├── globals.css                 # Global styles + Tailwind
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login page
│   │   └── dashboard/page.tsx      # Admin inquiry dashboard
│   └── api/
│       ├── inquiries/route.ts      # POST (submit) + GET (list)
│       ├── inquiries/[id]/route.ts # PATCH (update) + DELETE
│       ├── admin/route.ts          # Login / logout / auth check
│       └── sitemap/route.ts        # Dynamic sitemap
├── components/
│   ├── sections/                   # Homepage section components
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── EptoFlow.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── TechStack.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   └── ui/                         # Reusable UI components
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── CustomCursor.tsx
│       ├── Loader.tsx
│       ├── ParticleBackground.tsx
│       └── FloatingWhatsApp.tsx
├── lib/
│   ├── supabase.ts                 # Supabase client (client + server)
│   ├── resend.ts                   # Resend client + email templates
│   └── utils.ts                    # Utility functions
├── types/
│   └── index.ts                    # TypeScript interfaces
├── supabase/
│   └── schema.sql                  # Database schema (run in Supabase SQL Editor)
├── public/
│   ├── robots.txt
│   ├── site.webmanifest
│   └── [favicon files]
├── .env.example                    # Environment variable template
├── .env.local                      # Your actual env vars (DO NOT COMMIT)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 13. Common Issues

**Build error: "Module not found"**
→ Run `npm install` to install all dependencies.

**Supabase 401 error**
→ Check that `SUPABASE_SERVICE_ROLE_KEY` is correctly set and hasn't been wrapped in quotes.

**Resend emails not arriving**
→ Check your domain is verified in Resend dashboard. During dev, use `delivered@resend.dev` as the `to` address for testing.

**Admin login fails**
→ Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` exactly match what you type. They're case-sensitive.

**WhatsApp button not working**
→ Ensure `NEXT_PUBLIC_WHATSAPP_NUMBER` has no `+`, spaces, or dashes — just digits.

---

## Support

Built by Eptosi Smart Solutions · Part of Eptosi Group of Companies

For issues, open a GitHub issue or contact: contact@eptosismartsolutions.com
