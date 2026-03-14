import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// This function generates static paths at build time
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link href="/projects" className="text-blue-600 hover:underline mb-8 inline-block">
        ← Back to Projects
      </Link>
      
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        
        <div className="text-gray-600 mb-8">
          <time dateTime={project.date}>
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        
        {project.image && (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-xl text-gray-700">{project.longDescription}</p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Source Code
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
