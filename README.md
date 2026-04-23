# AmpliSkill Website

A multipage static website for AmpliSkill — a management development, consulting, and research firm.

## Site map

| File | Purpose |
|---|---|
| `index.html` | Home page — hero, three pillars, announcements, upcoming cohorts, testimonial |
| `about.html` | About Us — Who we are, Who we serve, Mission/Vision/Goal |
| `team.html` | Executive team, Advisory Council, Academic Partners, Industry Partners, Editorial Board |
| `programs.html` | Programs landing with two tabs: **Announced** (calendar-based) and **Customized** |
| `program-template.html` | Reusable detail page for an individual program — duplicate and edit for each new program |
| `consulting.html` | Five consulting services + approach + case highlights |
| `publications.html` | Hub page with tabs for Journal, Books, Blogs, Case Studies |
| `journal.html` | AJMSI deep dive — call for papers, submission types, editorial roadmap |
| `events.html` | Upcoming and past events |
| `contact.html` | Contact form + direct emails + office details |

## Shared assets

- `styles.css` — the entire design system (colors, typography, components)
- `script.js` — mobile nav, scroll reveals, FAQ accordion, filter chips

## Design system

**Palette**
- Coral `#F24E1E` — primary accent
- Ink `#0B1220` — deep navy for text and dark blocks
- Cream `#F8F3E7` — background
- Butter `#FFD93D` — secondary accent
- Teal `#00B4A6` — tertiary accent

**Typography**
- `Fraunces` — display serif (headlines)
- `Manrope` — body sans
- `JetBrains Mono` — labels, metadata

## How to add a new program

1. Duplicate `program-template.html` as `program-<slug>.html` (e.g., `program-board-readiness.html`)
2. Update the `<title>`, hero content, modules, faculty, schedule, fees, and FAQ
3. Add a new `.card` on `programs.html` linking to the new file

## How to add a new team member

Open `team.html` and add a new `.team-card` block into the appropriate `.team-grid`. Use the `.avatar.v2`, `.v3`, `.v4`, `.v5`, or `.v6` classes to vary the gradient background. Replace the placeholder letter with an `<img>` once photos are available.

## How to add a new event

Open `events.html` and add a new `.event-row` into the upcoming or past events list.

## Replacing placeholders

- **Team avatars**: currently use gradient tiles with a letter. Replace the `<div class="avatar">X</div>` with `<img src="team/person-name.jpg" alt="Name">` and add `object-fit: cover; width: 100%; height: 100%;` to the image.
- **Partner logos**: on `team.html`, replace `<span>Partner University 01</span>` with `<img src="partners/name.svg" alt="Partner Name">`.
- **Office address**: update on `contact.html` and footer (in each file) once confirmed.
- **Email addresses**: currently `hello@ampliskill.com` etc. — update on `contact.html` once real inboxes are set up.
- **Journal ISSN**: currently `[TBD]` — update once assigned.

## Deployment

This is a pure static site. It can be hosted on:
- Any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
- Standard shared hosting (just upload the folder)
- A CDN

No build step, no dependencies, no backend required.

## Contact form

The contact form on `contact.html` currently just shows a success message client-side. To make it live:
- **Netlify**: Add `data-netlify="true"` to the `<form>` tag — Netlify handles submissions automatically
- **Formspree**: Replace the form's `action` with your Formspree endpoint
- **Custom backend**: POST form data to your endpoint inside the `submit` handler in `contact.html`

## Browser support

Tested on Chrome, Safari, Firefox, and Edge. Uses modern CSS (`clamp()`, `aspect-ratio`, CSS variables, `backdrop-filter`). IE11 is not supported.

## License

© 2026 AmpliSkill. All rights reserved.
