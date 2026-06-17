# ZipLink

ZipLink is a lightning-fast URL shortener built to transform long, cluttered URLs into clean, trackable links. Get real-time analytics, click tracking, and complete link management — all in one place.

## Features

- **Lightning Fast**: Generate short links in milliseconds.
- **Rich Analytics**: Track every click with detailed analytics. See click counts, last clicked times, and performance trends over time.
- **Real-time Updates**: Experience live tracking with Supabase real-time integration. Dashboard updates instantly as users click your links.
- **Secure & Reliable**: Authentication powered by Clerk ensures your links and data are protected.
- **Modern UI**: Beautiful, responsive, and dynamic interface built with Tailwind CSS v4 and Framer Motion.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Shadcn UI
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

First, make sure you have your environment variables set up. You will need keys for Clerk and Supabase.

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router pages and API routes.
  - `api/`: API endpoints for shortening links and fetching analytics.
  - `dashboard/`: User dashboard for link management.
- `components/`: Reusable React components.
  - `dashboard/`: Dashboard-specific components like `LinksTable`, `ShortenForm`, and `StatsCards`.
  - `ui/`: Base UI components (buttons, inputs, etc.).
- `lib/`: Utility functions and database client setup.
- `types/`: TypeScript definitions.

### Author

- [Abhijith M I](https://github.com/jimitnick)


