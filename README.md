# Om Solanki — Portfolio

A warm, light personal portfolio built with React 18, Vite, CSS, and Lucide icons. Features a seven-link section-aware header, a portfolio overview, selected work with expandable details and filters, an experiment Lab, a dedicated toolkit with example projects, research interests, education, experience, a résumé link, and a contact form with FAQs.

## Develop and build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vercel settings: framework **Vite**, build command **npm run build**, output directory **dist**, production branch **main**. The custom domain must be assigned to a Vercel project connected to this repository for pushes to update it.

## Updating content

- `src/data/work.js`: featured projects, overlapping category filters, screenshot metadata, verified repository/demo links, additional projects, and skills.
- `src/data/portfolio.js`: original profile, education, experience, hackathons, contact endpoint, and social links. Legacy components and their old content exports remain for reference but are not rendered by the new app.
- `src/App.jsx`: page structure, introduction/about copy, filtering, navigation, and form behavior.
- `src/index.css`: base layout and typography.
- `src/components/ProjectMedia.jsx` and `src/projects.css`: real screenshot cards, browser-frame styling, category/search controls, and a native dialog for larger previews. Images are local and lazy loaded; Escape closes a preview and restores focus.
- `src/components/PortfolioDepth.jsx` and `src/content.css`: overview, toolkit, Lab, FAQs, expanded navigation and footer. Overview counts come from the content data; Lab descriptions are grounded in repository READMEs.
- `public/profile.jpg` and `public/resume.pdf`: existing photo and résumé.
- `index.html`: title, description, canonical URL, and sharing metadata.

Project descriptions are based on their repositories. Medical-image projects are research demonstrations; no clinical performance claims are made. Project cards show actual screenshots of the public project interfaces or repository documentation. Image provenance is recorded in `public/projects/SOURCES.md`. Screenshots are previews of the UI, not evidence of production or clinical readiness.

## Opening animation

`src/components/Intro.jsx` implements an original particle convergence and name reveal with plum, copper, and warm amber light. It evolves the earlier numerical intro inspired by [CODING-DARSH/Portfolio](https://github.com/CODING-DARSH/Portfolio); no source or assets were copied from that repository.

The intro lasts approximately 6.2 seconds on desktop and phone, plays once per browser-tab session, can be skipped with the button or Escape, and can be replayed from the footer. Reduced-motion preferences skip it. Animation frames, listeners, and scroll locking are cleaned up on exit. The sequence pauses while the tab is hidden.

## Interactive effects

`src/components/MotionExperience.jsx` and `src/motion.css` add a pointer-responsive hero constellation, soft aurora colours, a fine-pointer cursor halo, project artwork tilt, and a reading progress indicator. The native cursor remains visible. Pointer decoration is clipped to the viewport and disabled on touch devices. Canvas work stops outside the hero or in a hidden tab. The footer's Pause effects control persists the preference; reduced-motion settings also disable motion. Project filters do not replay animations on already-seen sections.

## Contact

The form retains the existing Formspree endpoint. It has explicit labels, browser validation, a request timeout, and success/error feedback. The email link works independently. Local QA uses intercepted responses and does not send test messages to the owner; production delivery depends on the existing Formspree account configuration.

## Verification

Production build and browser checks cover layouts at 320, 390, 768, and 1440 pixels; intro completion/skip/replay; reduced motion; session persistence; mobile navigation and Escape dismissal; section-aware header links; toolkit/Lab anchors and FAQs; project filters; photo/résumé loading; and mocked contact success/failure. No JavaScript runtime errors were observed during those checks.

The current design uses warm ivory surfaces, deep plum ink, wine accents, and copper highlights. It uses Inter for body text and Manrope for headings, the original full-color portrait, and subtle one-time section entrances. The intro restores keyboard focus after dismissal. Motion is disabled when reduced motion is requested.

## Project browsing

Seven filters (All, AI & ML, Computer vision, LLMs, Web apps, Cybersecurity, Data science) support projects with overlapping subjects. Keyword search covers titles, descriptions, categories, and technologies, with result counts and an empty-state reset. Six featured screenshots and three Lab previews can be enlarged with keyboard-accessible native dialogs. Public demos are linked where checked; Signal Desk keeps its source link because its deployment was inaccessible during verification.

## Header and phone layout

`src/components/SiteHeader.jsx` adds a floating responsive header, a native-dialog mobile menu with section descriptions and résumé/social shortcuts, and a quick-search dialog opened by the header or Ctrl/Cmd K. Search covers sections, project titles, categories, technologies, descriptions, and the résumé. Screenshot results open the existing project preview. Escape closes dialogs, focus is restored, and body scrolling is unlocked before a second dialog opens.

`src/header.css` contains header and phone layout rules, including concise mobile introduction copy and a compact portrait/bio card. `src/theme.css` is imported last and supplies the complete warm ivory, plum, wine, and copper palette. Original photos and project screenshots retain their natural colours. Canvas particles use the same palette. No theme toggle or external search service is needed.
