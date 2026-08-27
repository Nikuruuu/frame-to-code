# Frame-to-Code — Turn UI Frames into Working Code, Fast

A Next.js app that converts visual frames into production-ready UI code and scaffolds a working frontend with database and cloud integrations — designed for rapid prototyping, developer evaluation, and LLM-assisted generation.

## 🚀 Key Features

- Visual → Code pipeline: integrations for converting UI frames into component scaffolding and editable code previews (Sandpack-powered).
- Modern Next.js App Router frontend using React 18 and TypeScript with built-in theming and animations.
- Shadcn + Radix UI primitives and Lucide icons for consistent, accessible UI components.
- Cloud integrations: Firebase configuration for storage/auth and Neon (Postgres-compatible) for persistent storage via Drizzle ORM.
- LLM-ready hooks: OpenAI SDK is installed and available for code-generation or assistant features.
- Developer-friendly: in-browser editing (Sandpack), TailwindCSS utilities, and a small, focused dependency set for fast iteration.

## 🛠️ Tech Stack

- Frontend
  - Next.js (App Router, Next 15)
  - React 18, TypeScript
  - @codesandbox/sandpack-react (in-browser code editing)
  - Radix UI, shadcn-style components, Lucide icons
  - Tailwind CSS + tailwindcss-animate

- Backend / Server-side
  - Next.js server components & route handlers
  - Axios for HTTP requests
  - OpenAI SDK for LLM-powered features

- Database
  - Neon (Postgres-compatible) via @neondatabase/serverless
  - Drizzle ORM and drizzle-kit for schema and migrations

- Styling / Utilities
  - Tailwind CSS, PostCSS
  - class-variance-authority, clsx
  - sonner (notifications), uuid

- Dev / Tooling
  - Node.js + npm, TypeScript, dotenv
  - Scripts: dev, build, start, lint

## 📂 Project / Architecture Structure

A simplified, annotated top-level tree to orient reviewers quickly:

```
.
├─ .env.example               # Example environment variables
├─ package.json               # Scripts & dependencies
├─ next.config.ts             # Next.js configuration (image remote patterns)
├─ tailwind.config.ts         # Tailwind / design tokens
├─ drizzle.config.ts          # Drizzle + Neon DB config
├─ tsconfig.json              # TypeScript config
├─ postcss.config.mjs         # PostCSS config
├─ components.json            # shadcn UI generator config & aliases
├─ public/                    # Static assets (images, icons)
├─ app/                       # Next.js App Router (pages, layouts, API routes)
├─ components/                # Reusable UI components and primitives
├─ configs/                   # Database schema and config (configs/schema.ts)
├─ context/                   # React context providers
├─ data/                      # Static or seeded data
├─ hooks/                     # Custom React hooks
├─ lib/                       # Helpers, API wrappers, utilities
└─ README.md                  # Project documentation (this file)
```

How it fits together:
- app/ contains the Next.js entry points, layouts, and any route handlers. components/ (shadcn-style) provides UI primitives used across pages. Server-side code accesses the Neon/Postgres database through Drizzle and can call external APIs (OpenAI, Firebase). Sandpack integration supports in-browser previews and rapid prototyping.

## ⚙️ Getting Started / Local Setup

### Prerequisites

- Node.js 18+ (LTS recommended) and npm (or yarn/pnpm)
- A PostgreSQL-compatible database (Neon recommended) and connection string
- (Optional) Firebase project credentials if you intend to use Firebase storage/auth
- (Optional) OpenAI API key for LLM features

### Quick start

1. Clone the repository

```bash
git clone https://github.com/Nikuruuu/frame-to-code.git
cd frame-to-code
```

2. Install dependencies

```bash
npm install
# or
# yarn
# pnpm install
```

3. Configure environment variables

```bash
cp .env.example .env
# then open .env and fill in your credentials
```

4. (Optional) Run Drizzle migrations

If you use Drizzle for migrations, follow your drizzle-kit workflow. Example commands (adjust as needed):

```bash
# generate a migration from schema
npx drizzle-kit generate --schema ./configs/schema.ts --name init
# or apply migrations
npx drizzle-kit push
```

5. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

### Build & production

- Build for production

```bash
npm run build
```

- Start production server

```bash
npm start
```

- Lint

```bash
npm run lint
```

## 🔐 Environment Variables

Create a .env file from .env.example and populate these keys (placeholders shown):

```env
# Firebase (client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MESURMENT_ID=G-XXXXXXXXXX

# Neon / Postgres connection (server-side)
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=postgresql://user:password@host:5432/dbname

# Optional: OpenAI key for LLM features
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Notes
- Keep secrets out of source control. Use your deployment platform's secret manager (Vercel, Netlify, etc.) for production.
- NEXT_PUBLIC_* variables are exposed to the browser; keep only non-sensitive public configuration there.

