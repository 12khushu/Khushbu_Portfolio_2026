# Khushbu Singh — Frontend Developer Portfolio

A premium, single-page portfolio for Khushbu Singh (Frontend / React.js Developer, 4+ years experience). Built as a fast, static site — no build step required — ready to host on GitHub Pages, Netlify, or Vercel.

## Design system

- **Palette:** Primary `#4F46E5`, Secondary `#6366F1`, Accent `#14B8A6`, Background `#F8FAFC`, Section `#FFFFFF`, Text `#1E293B`
- **Type:** Manrope (display), Inter (body), JetBrains Mono (code accents / eyebrows / tech badges)
- **Signature motif:** "Component Inspector" — the hero renders as a mock code editor window, and project cards use a browser-chrome mockup, echoing the subject's real day-to-day tools (React, Storybook, browser devtools).

## Tech stack

HTML5 · CSS3 (custom, no framework lock-in) · Bootstrap 5 (utility layer only) · JavaScript (ES6) · jQuery · AOS (scroll reveal) · GSAP (hero entrance) · Typed.js (role rotator) · Font Awesome (icons)

All third-party libraries are loaded via CDN — no `npm install` needed.

## Folder structure

```
/
├── index.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   │   └── avatar-placeholder.svg
│   └── resume/
│       └── Khushbu-Singh-Resume.pdf
└── README.md
```

## Content source

All copy — experience, projects, skills, education, certifications and achievements — is taken verbatim from Khushbu Singh's resume. No experience, projects, or testimonials have been invented. The Testimonials section from the original spec was intentionally omitted (no real testimonials available).

## Running locally

No build tools required. Either:

1. Open `index.html` directly in a browser, or
2. Serve it locally for correct relative paths, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```

## Deploying

**GitHub Pages**
1. Push this folder to a GitHub repository.
2. Repo → Settings → Pages → Deploy from branch → `main` / root.

**Netlify**
1. Drag-and-drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo.
2. No build command needed — publish directory is `/`.

## Making the contact form send real emails

The form is wired to [Formspree](https://formspree.io) — a hosted form-backend that emails you every submission. It works on GitHub Pages, Netlify, or any static host (unlike Netlify Forms, which only works when hosted on Netlify).

1. Go to [formspree.io](https://formspree.io) and sign up free (50 submissions/month on the free tier).
2. Create a new form and set the destination email to `khushbusinghfe@gmail.com`.
3. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
4. In `index.html`, find the contact `<form>` tag and replace `YOUR_FORM_ID` in the `action` URL with your real ID:
   ```html
   <form id="contact-form" action="https://formspree.io/f/abcdwxyz" method="POST" novalidate>
   ```
5. Open Formspree's dashboard once and submit the form yourself (or from the live site) — Formspree requires one confirmation submission the first time to verify the destination email.
6. That's it — submissions now arrive in your inbox, and the page shows an inline "message sent" or "something went wrong" state without reloading.

**Alternatives** if you'd rather not use Formspree:
- **Netlify Forms** — if hosting on Netlify, add `data-netlify="true"` to the `<form>` tag and remove the `action`/JS submit override; Netlify detects and handles it automatically at build time.
- **EmailJS** — sends straight from the browser via your own Gmail/Outlook account using their JS SDK; needs a bit more setup (service ID, template ID, public key) but avoids a third-party inbox relay.

## Things to swap in before going live

- **Profile photo:** replace `assets/images/avatar-placeholder.svg` with a real headshot (update the `<img>` reference in the hero section of `index.html`).
- **Resume file:** replace `assets/resume/Khushbu-Singh-Resume.pdf` whenever the resume is updated (filename can stay the same so links keep working).
- **Contact form endpoint:** see above — currently a placeholder `YOUR_FORM_ID` that must be replaced or the form will show a configuration warning instead of sending.
- **Map embed:** the contact section currently points to a generic Noida map; replace with a precise embed if desired.
