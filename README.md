# Mohammed Abdrabou — Portfolio

A tactical/military-themed personal portfolio built with React, TypeScript, and Vite. Live at [moabdrabou.dev](https://moabdrabou.dev).

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for build tooling
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Features

- **Boot Sequence** — Animated splash screen with typing effects and tactical HUD elements
- **Hero Section** — Animated title with scan line overlays and tactical role badges
- **Missions** — Project portfolio grid showcasing completed work with tech stacks and live links
- **Loadout** — Skills breakdown with animated mastery-level progress bars
- **Intel** — Bio and mission briefing with architecture logs
- **Comms** — Contact section with signal transmission animation and social links
- **Aurora Background** — Layered animated gradient background effect
- Custom CRT scanlines, glitch effects, and flicker animations throughout

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start Vite dev server        |
| `npm run build`     | TypeScript check + Vite build|
| `npm run preview`   | Preview production build     |
| `npm run lint`      | Run ESLint                   |

## Project Structure

```
src/
├── components/
│   ├── ui/           # Boot sequence splash screen
│   ├── sections/     # Hero, Missions, Loadout page sections
│   ├── Background.tsx
│   └── icons.tsx
├── assets/           # Images, logos, favicon
├── App.tsx           # Main app with lazy-loaded sections
├── globals.css       # Tailwind config and design tokens
├── tactical.css      # Tactical theme animations and effects
└── main.tsx          # Entry point
```

## Deployment

Deployed to Hostinger via GitHub Actions on push to `main`. The workflow installs dependencies, builds the project, and syncs the `Live/` output directory to `domains/moabdrabou.dev/public_html/` over FTP.
