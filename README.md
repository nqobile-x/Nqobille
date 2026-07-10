# Nqobile Sibiya — Portfolio Website

My personal portfolio site: projects, certifications, and contact details, with a Three.js particle background and GSAP scroll animations.

**Live site: [nqobile-x.github.io/Nqobille](https://nqobile-x.github.io/Nqobille/)**

<!-- SCREENSHOT PLACEHOLDER: add a screenshot of the homepage hero here -->

## Overview

This is the site I point recruiters and clients to. It is deliberately built without a framework or build step: one HTML file, hand-written CSS, and vanilla JavaScript, enhanced with a few CDN libraries for motion and interactivity. That keeps it fast to load, trivial to host on GitHub Pages, and easy to update.

## Features

- **Animated Three.js background**: a rotating field of 1,000 particles rendered behind the page content
- **Dark mode** with an Alpine.js toggle, persisted to localStorage
- **GSAP + ScrollTrigger animations** as sections come into view
- **Responsive photo grid** for projects and certifications with hover overlays
- **Accessibility and compatibility fixes** including Safari support and `noopener` on external links
- Downloadable resume and certification images

## Tech stack

- HTML5, CSS3, vanilla JavaScript
- Tailwind CSS (CDN)
- Alpine.js for lightweight state (dark mode)
- Three.js for the particle background
- GSAP with ScrollTrigger for scroll animations
- Font Awesome icons
- Hosted on GitHub Pages

## Running locally

No build step needed. Clone the repo and open `index.html` in a browser, or serve the folder with any static server:

```bash
git clone https://github.com/nqobile-x/Nqobille.git
cd Nqobille
python -m http.server 8000   # then open http://localhost:8000
```

## What I learned

Building this without a framework made me handle things frameworks normally hide: persisting theme state across reloads, sequencing scroll-triggered animations so they do not fight each other, and keeping a WebGL canvas running behind the page without wrecking scroll performance on lower-end devices.

## Contact

- Portfolio: [nqobile-x.github.io/Nqobille](https://nqobile-x.github.io/Nqobille/)
- GitHub: [@nqobile-x](https://github.com/nqobile-x)
