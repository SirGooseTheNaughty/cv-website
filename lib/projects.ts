import projectsData from '@/data/projects.json';

interface Achievement {
    value: string;
    description?: string;
}

export interface Project {
  slug: string;
  type: string;
  featured?: boolean;
  isFreelance?: boolean;
  title: string;
  image: string;
  year: string;
  team: string;
  role: string;
  timeSpent: string;
  liveUrl: string;
  goal?: string;
  tasks?: string[];
  solutions?: string[];
  technologies: string[];
  gallery?: string[];
  achievements?: Achievement[];
}

export function getAllProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.find((project) => project.slug === slug) as Project | undefined;
}

export function getFeaturedProjects(): Project[] {
  return projectsData.filter((project) => project.featured) as Project[];
}

export function getProjectSlugs(): string[] {
  return projectsData.map((project) => project.slug);
}
