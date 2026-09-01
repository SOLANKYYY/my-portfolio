# Solanki Om Narendra — Portfolio

A production-grade, component-based portfolio built with **Vite + React + Tailwind CSS + Framer Motion + Lucide React**.

## Stack

- **Vite** — build tooling / dev server
- **React 18** — component architecture
- **Tailwind CSS** — utility-first styling, themed to the brand palette
- **Framer Motion** — scroll reveals, stagger animations, layout transitions
- **Lucide React** — icon set

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

The production build is emitted to `dist/`.

## Project structure

```
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   ├── profile.jpg
│   └── resume.pdf
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── portfolio.js       # all content lives here
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── NeuralBackground.jsx
        ├── About.jsx
        ├── Education.jsx
        ├── Skills.jsx
        ├── Experience.jsx
        ├── Projects.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Brand tokens (`tailwind.config.js`)

| Token          | Hex       | Use                            |
|----------------|-----------|---------------------------------|
| `page`         | `#FAFAFA` | Page background                |
| `charcoalDark` | `#1A1A1A` | Headings / primary text         |
| `charcoal`     | `#333333` | Body text                       |
| `gold`         | `#C5A059` | Primary accent / gradients      |
| `gold-dark`    | `#B8860B` | Hover states / darker accents   |
| `gold-light`   | `#E8D5A5` | Subtle highlights / gradients   |

## Notes

- All copy (bio, education, skills, experience, projects) lives in `src/data/portfolio.js` — edit that file to update content without touching components.
- The **LeetCode Solutions & DSA Repository** project card currently points to a placeholder GitHub URL (`github.com/SOLANKYYY/leetcode-dsa-solutions`) — update the `github` field for that entry in `src/data/portfolio.js` with your real repository link.
- The contact form posts to the same Formspree endpoint as the original site (`https://formspree.io/f/mdalbzlw`).
- `NeuralBackground.jsx` uses `requestAnimationFrame`, a debounced `ResizeObserver` (150ms), squared-distance math to avoid unnecessary `sqrt` calls, a capped particle count, and respects `prefers-reduced-motion`.
- Card and nav animations use only `transform`/`opacity` (Framer Motion) so they stay on the GPU compositor thread instead of forcing layout recalculation.
