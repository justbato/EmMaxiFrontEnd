# EmMaxi — EdTech Frontend

React + TypeScript + Vite + Tailwind CSS + Supabase

## Quick Start

```bash
npm install
cp .env.example .env          # add your Supabase keys (optional)
npm run dev
```

## Demo Logins (no Supabase needed)

| Role       | Email                  | Password   |
|------------|------------------------|------------|
| Student    | student@demo.com       | demo1234   |
| Instructor | instructor@demo.com    | demo1234   |
| Admin      | admin@demo.com         | demo1234   |

## Pages & Routes

| Route                    | Page                         |
|--------------------------|------------------------------|
| `/`                      | Landing page                 |
| `/login`                 | Login                        |
| `/signup`                | Signup (student / instructor)|
| `/courses`               | Browse all courses           |
| `/courses/:id`           | Course detail                |
| `/student`               | Student dashboard            |
| `/student/courses`       | My courses                   |
| `/student/settings`      | Student settings             |
| `/learn/:courseId`       | Lesson player                |
| `/instructor`            | Instructor dashboard         |
| `/instructor/builder`    | 5-step course builder        |
| `/instructor/qa`         | Q&A management               |
| `/instructor/settings`   | Instructor settings + payout |
| `/admin`                 | Admin panel                  |

## Stack

- **Routing**: React Router v6 with protected routes + role guards
- **Auth**: AuthContext with demo users + Supabase fallback
- **Notifications**: NotifContext with tabbed panel
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Icons**: Inline SVG (zero dependency)
- **DB**: Supabase JS client (typed schema in `src/lib/supabase.ts`)

## Design System

- Brand gold: `#D4A017`
- Dark sidebar: `#111111`
- Font display: Clash Display
- Font body: Satoshi
- Border radius: 14px cards, 8px inputs, 9999px pills

## Supabase Schema

See `src/lib/supabase.ts` for the full typed `Database` interface covering:
`profiles`, `courses`, `enrollments`, `lessons`, `sections`, `reviews`, `questions`
