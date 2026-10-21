# Om Solanki — Portfolio

A monochrome personal portfolio built with React 18, Vite, CSS, and Lucide icons. Features selected work, expandable project details, project filters, research interests, education, experience, a résumé link, and a contact form.

## Develop and build

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vercel settings: framework **Vite**, build command **npm run build**, output directory **dist**, production branch **main**. The custom domain must be assigned to a Vercel project connected to this repository for pushes to update it.

## Updating content

- `src/data/work.js`: featured projects, repository/demo links, additional projects, and skills.
- `src/data/portfolio.js`: original profile, education, experience, hackathons, contact endpoint, and social links. Legacy components and their old content exports remain for reference but are not rendered by the new app.
- `src/App.jsx`: page structure, introduction/about copy, filtering, navigation, and form behavior.
- `src/index.css`: responsive black-and-white theme and project illustrations.
- `public/profile.jpg` and `public/resume.pdf`: existing photo and résumé.
- `index.html`: title, description, canonical URL, and sharing metadata.

Project descriptions are based on their repositories. Medical-image projects are research demonstrations; no clinical performance claims are made. Abstract project artwork is illustrative, not a screenshot of the applications.

## Opening animation

`src/components/Intro.jsx` implements a numerical field that dissolves into Om's name, inspired by [CODING-DARSH/Portfolio](https://github.com/CODING-DARSH/Portfolio). This is an original implementation; no source or assets were copied from that repository, which had no license file at inspection.

The intro lasts approximately 3.4 seconds, plays once per browser-tab session, can be skipped with the button or Escape, and can be replayed from the footer. Reduced-motion preferences skip it. Animation frames, listeners, and scroll locking are cleaned up on exit.

## Contact

The form retains the existing Formspree endpoint. It has explicit labels, browser validation, a request timeout, and success/error feedback. The email link works independently. Local QA uses intercepted responses and does not send test messages to the owner; production delivery depends on the existing Formspree account configuration.

## Verification

Production build and browser checks cover layouts at 320, 390, 768, and 1440 pixels; intro completion/skip/replay; reduced motion; session persistence; mobile navigation; project filters; photo/résumé loading; and mocked contact success/failure. No JavaScript runtime errors were observed during those checks.
