# 🛒 বাজার দর (BazarDor)

বাংলাদেশের প্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) আজকের বাজারদর এক নজরে দেখার ওয়েব অ্যাপ।

🔗 Live: _your-vercel-link_

## Technologies
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4 + DaisyUI
- Better Auth (Email/Password, Google, GitHub)
- MongoDB Atlas
- react-hot-toast

## Features
1. Infinite scrolling live price ticker with ▲/▼ change percentages
2. Top 6 risers and fallers, plus all products in a responsive grid
3. Category pages with numeric price sorting (Bengali digits handled)
4. Protected product details with market-wise min, max and average prices
5. Email/password and Google/GitHub login with toast notifications
6. Profile page with name update
7. Skeleton loaders, custom 404 and fully responsive layout

## Run locally
```bash
npm install
npm run dev
```
Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE=
NEXT_PUBLIC_APP_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```