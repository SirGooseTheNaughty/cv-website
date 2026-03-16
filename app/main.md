# Main Page Spec (clarified)

Goal: rebuild the homepage as a more interesting, fuller version of the CV page.

## Product direction

- Audience: balanced for both hiring managers and potential clients.
- Tone: editorial minimal (not experimental).
- Content approach: same core CV structure, but with richer presentation and stronger narrative flow.
- No extra sections beyond the ones listed below.

## Styling

- Keep the UI neat and minimal.
- Default palette: natural black/white tones (avoid pure #000 and #fff).
- Accent color: #FB8C67.
- Avoid images/icons where possible; rely on typography and minimal graphic elements (lines, dots, dividers).
- Use fluid sizing relative to viewport dimensions, compatible with Tailwind utility classes.

## Animation

- Add micro-animations to interactive elements.
- Primary interaction behavior: color transitions to accent color.

## Components

- Build a reusable internal component system (headings, links, buttons, section wrappers, etc).
- For functional UI primitives (for example accordion/form behaviors), use shadcn components.

## Page structure

The structure should resemble the CV page but feel more complete and polished.

### Hero

Must include:

- Name: "Sergey V."
- Roles: frontend developer, full-stack developer, creative developer
- Primary CTA to contact

### About

Must include:

- A few-paragraph intro text
- A required video self-presentation block (video asset will be uploaded to S3)

Text:

Frontend Engineer with 5+ years of experience building high-performance web applications and interactive user interfaces. Specialised in React, TypeScript, and modern browser APIs, with strong collaboration with product designers to deliver polished UX. Previously Frontend Lead at EPAM and Co-founder of a creative web studio delivering award-winning web experiences.

### Core skills

Present skills grouped by topic.

**Languages & Frameworks**

JavaScript (ES6+), TypeScript, React, styled-components, Redux, Node.js, HTML5, CSS/SASS/SCSS, Tailwind

**Architecture & Practices**

Atomic design, component-driven development, state management (Redux, Context, Tanstack Query), SPA, SSR, responsive design, accessibility (WCAG, ARIA), internationalization (i18n), REST APIs, WebSockets, code splitting

**Testing & CI/CD**

Jest, Playwright, Cypress, Git, Jenkins, npm, Webpack, Vite, Docker

**Other Tools & Experience**

AWS (Lambda, S3, DynamoDB, CloudFront), Webflow, GSAP, Motion, Lit, Three.js, D3.js, Vue, Angular, Python, Java, MySQL, PostgreSQL, MongoDB

**Soft Skills**

Team leadership, mentoring, design collaboration, code reviews, client communication, decision making

### Work experience

#### Software Engineer, Front-End Lead

**EPAM Systems** — outsource/outstaff software development company. | *2021 – 2024 | St. Petersburg & Tbilisi, remote*

- Led front-end development in React and its ecosystem for two distributed teams, aligning code standards and UX consistency
- Delivered production features for enterprise web platforms used by large distributed teams
- Mentored junior developers, conducted code reviews, and championed accessibility standards with a11y
- Proposed and implemented UX improvements adopted by the client, improving usability and satisfaction
- Reduced CI execution time by ~70% by migrating e2e tests from Robot Framework to Playwright
- Introduced atomic design practices and modular state management with Tanstack Query for maintainability
- Implemented new features across React frontend, Java backend, and AWS-based services

#### Co-founder & Tech Lead

**3200 Kelvin Studio** — boutique web design and development studio. | *2024 – Present | Remote*

- Co-founded a creative web studio delivering high-performance marketing and product websites for international clients
- Built complex front-end interactions using JavaScript, modern CSS, GSAP, and browser APIs
- Collaborated closely with designers from concept and prototyping through production implementation
- Led engineering decisions and development workflows for a distributed team of 4–6 developers and designers
- Optimised performance and accessibility, achieving Lighthouse scores 85+ across performance, SEO, and accessibility
- Mentored junior developers in JavaScript, Webflow architecture, and modern CSS

### Projects

Format: accordion only.

- Collapsed state: show project name, project type, and a live link (if available).
- Expanded state: show short description, key achievements, and technology list.

Initial project set:

- [3200 Kelvin studio](https://www.awwwards.com/sites/3200-kelvin)
- [Kultiveret](https://www.awwwards.com/sites/kultiveret)
- [Integrated Wealthcare](https://www.cssdesignawards.com/sites/integrated-wealthcare/48274/)
- [Darina CG](https://www.awwwards.com/sites/darina-cg-artist)
- ELN system (no live link)

### Awards and recognition

- Awwwards: Site of the Day (x3), Developer Award (x3)
    - [3200 Kelvin studio](https://www.awwwards.com/sites/3200-kelvin) | 2025
    - [Kultiveret](https://www.awwwards.com/sites/kultiveret) | 2025
    - [Darina CG portfolio](https://www.awwwards.com/sites/darina-cg-artist) | 2023
- CSSDA: Site of the Day (x3)
    - [3200 Kelvin studio](https://www.cssdesignawards.com/sites/3200-kelvin/46930/) | 2025
    - [Kultiveret](https://www.cssdesignawards.com/sites/kultiveret/47305/) | 2025
    - [Integrated Wealthcare](https://www.cssdesignawards.com/sites/integrated-wealthcare/48274/) | 2025

### Contact

Must include:

- Copy along the lines of: "Contact me to discuss your project"
- Contact links (reuse from CV)
- A working contact form with fields: name, email, project description