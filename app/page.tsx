

import { Button } from "@/components/ui/button";
import { ContactForm, ProjectAccordion, Section, SkillsGroup, Tag } from "./components/main";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";
import { awards } from "@/data/awards";
import { contacts } from "@/data/contacts";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-1 text-content">
      <div className="w-full px-4 pb-16 sm:px-8 sm:pb-24">
        <header className="flex min-h-screen flex-col justify-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-hero font-semibold leading-[0.95] tracking-[-0.03em]">
              Sergey V.
            </h1>
            <ul className="flex flex-wrap gap-2">
              {["Frontend Developer", "Full-Stack Developer", "Creative Developer"].map((role) => (
                <li key={role}>
                  <Tag>{role}</Tag>
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-4 sm:max-w-[45%]">
              <p className="text-lg text-content/75">
                Building high-performance web products with strong UX, clean architecture, and meaningful visual detail.
              </p>
              <Button asChild className="h-11 rounded-none bg-content px-6 text-bg-1 transition-colors hover:bg-accent">
                <a href="#contact">Contact me</a>
              </Button>
            </div>
          </div>
        </header>

        <Section id="about" title="About">
          <div className="grid gap-8 sm:grid-cols-12">
            <div className="space-y-4 text-content/85 sm:col-span-6">
              <p className="leading-relaxed">
                Frontend Engineer with 5+ years of experience building high-performance web applications and interactive user interfaces.
              </p>
              <p className="leading-relaxed">
                Specialised in React, TypeScript, and modern browser APIs, with strong collaboration with product designers to deliver polished UX.
              </p>
              <p className="leading-relaxed">
                Previously Frontend Lead at EPAM and Co-founder of a creative web studio delivering award-winning web experiences.
              </p>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Core Skills" className="space-y-6">
          {skills.map((group) => (
            <SkillsGroup key={group.title} title={group.title} skills={group.skills} />
          ))}
        </Section>

        <Section id="experience" title="Work Experience" className="space-y-8">
          {experiences.map((experience) => (
            <article key={experience.title} className="grid gap-4 border-b border-stroke pb-8 sm:grid-cols-12">
              <div className="sm:col-span-4">
                <h3 className="text-xl font-medium">{experience.title}</h3>
                <p className="mt-1 text-content/80">{experience.company}</p>
                <p className="mt-1 text-sm text-content/60">{experience.meta}</p>
              </div>
              <ul className="space-y-2 text-content/85 sm:col-span-8">
                {experience.points.map((point) => (
                  <li key={point} className="relative pl-4 before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-content/60">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Section>

        <Section id="projects" title="Projects">
          <ProjectAccordion />
        </Section>

        <Section id="awards" title="Awards and Recognition" className="space-y-6">
          {awards.map((block) => (
            <article key={block.label} className="border-b border-stroke pb-6">
              <h3 className="mb-3 text-xl font-medium text-content">{block.label}</h3>
              <ul className="space-y-2 text-content/80">
                {block.items.map((item) => (
                  <li key={item.href} className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {item.name}
                    </a>
                    <span className="text-content/50">|</span>
                    <span className="text-content/65">{item.year}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Section>

        <Section id="contact" title="Contact">
          <div className="grid gap-8 sm:grid-cols-12">
            <div className="space-y-4 sm:col-span-5">
              <p className="text-lg text-content/85">
                Contact me to discuss your project.
              </p>
              <ul className="flex flex-wrap gap-2">
                {contacts.map((contact) => (
                  <li key={contact.label}>
                    <Tag asChild>
                      <a href={contact.href} target="_blank" rel="noreferrer">
                        {contact.label}
                      </a>
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
