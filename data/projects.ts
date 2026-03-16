export type Project = {
  name: string;
  type: string;
  liveUrl?: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const projects: Project[] = [
  {
    name: "3200 Kelvin Studio",
    type: "Studio Website",
    liveUrl: "https://www.3200kelvin.com/",
    description:
      "Award-winning studio website focused on performance, editorial rhythm, and interaction quality.",
    achievements: [
      "Awwwards Site of the Day and Developer Award",
      "CSSDA Site of the Day",
      "Implemented custom solutions for smooth, performant animations and interactions",
    ],
    technologies: ["Webflow", "JavaScript", "CSS", "GSAP", "AWS", "Lenis.js", "Barba.js"],
  },
  {
    name: "ELN System",
    type: "SaaS Product",
    description:
      "Complex product interface for scientific workflows, focusing on reliability and maintainability.",
    achievements: [
      "Implemented scalable frontend architecture",
      "Reduced CI time by championing transition to Playwright for e2e tests",
      "Implemented new features across frontend, backend, and cloud services",
      "Contributed to building and maintaining company-wide design system and component library",
    ],
    technologies: ["React", "Redux", "TypeScript", "TanStack Query", "styled-components", "AWS", "Java"],
  },
  {
    name: "Kultiveret",
    type: "Brand Website",
    liveUrl: "https://www.kultiveret.com/",
    description:
      "Creative brand experience with immersive transitions and a strong visual narrative.",
    achievements: [
      "Awwwards Site of the Day and Developer Award",
      "CSSDA Site of the Day",
      "Optimized for smooth interaction on modern devices",
      "One of my proudest CSS hacks to this day on the category pages, achieving impressive animations with maximum performance",
    ],
    technologies: ["Webflow", "JavaScript", "CSS", "GSAP", "AWS", "Lenis.js", "Barba.js"],
  },
  {
    name: "Acuity",
    type: "Product",
    liveUrl: "https://github.com/digital-cancer-research/acuity-docker",
    description:
      "Complex product interface for scientific workflows, focusing on reliability and maintainability.",
    achievements: [
      "Implemented scalable and maintainable data visualization features with d3.js",
      "Introduced UX improvements increasing platform usability and user satisfaction",
      "Contributed across frontend, backend, and testing, improving overall product quality and reliability",
    ],
    technologies: ["d3.js", "TypeScript", "Angular", "CSS"],
  },
  {
    name: "Integrated Wealthcare",
    type: "Corporate Platform",
    liveUrl: "https://www.iwcglobal.net/",
    description:
      "Enterprise-facing site balancing content clarity, accessibility, and polished UI behavior.",
    achievements: [
      "CSSDA Site of the Day",
      "Created multiple levels of animation and interaction detail for different user preferences and device capabilities",
      "Delivered reliable responsive behavior across breakpoints",
      "Implemented paywall and subscription management features with Memberstack",
    ],
    technologies: ["Webflow", "JavaScript", "CSS", "GSAP", "Lenis.js", "Barba.js", "Memberstack", "Azure"],
  },
  {
    name: "Darina CG",
    type: "Artist Portfolio",
    liveUrl: "https://darina-cg.com/",
    description:
      "Minimal, image-led portfolio with subtle motion and a strong artistic tone.",
    achievements: [
      "Awwwards Site of the Day and Developer Award",
      "Balanced visual impact with lightweight delivery",
      "First time experimenting with page transitions",
    ],
    technologies: ["Webflow", "JavaScript", "CSS", "Lenis.js"],
  },
];
