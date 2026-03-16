"use client";

import { useRef } from "react";
import { animate } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowUpRightIcon } from "lucide-react";
import { Tag } from "./Tag";
import { projects } from "@/data/projects";

function getVerticalDirection(event: React.MouseEvent<HTMLElement>): "top" | "bottom" {
  const rect = event.currentTarget.getBoundingClientRect();
  return event.clientY < rect.top + rect.height / 2 ? "top" : "bottom";
}

function DirectionalFillRow({ children }: { children: React.ReactNode }) {
  const fillRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    const dir = getVerticalDirection(e);
    fill.style.transform = `translateY(${dir === "top" ? "-100%" : "100%"})`;
    animate(fill, { y: "0%" }, { duration: 0.5, ease: [0.22, 1, 0.36, 1] });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const fill = fillRef.current;
    if (!fill) return;
    const dir = getVerticalDirection(e);
    animate(fill, { y: dir === "top" ? "-100%" : "100%" }, { duration: 0.4, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-accent"
        style={{ transform: "translateY(-100%)" }}
      />
      <div className="relative transition-colors group-hover:text-white">{children}</div>
    </div>
  );
}

export function ProjectAccordion() {
  return (
    <Accordion type="single" collapsible className="border-t border-stroke">
      {projects.map((project) => (
        <AccordionItem key={project.name} value={project.name} className="border-stroke">
          <DirectionalFillRow>
            <AccordionTrigger className="py-5 text-left hover:no-underline [&>svg]:self-center">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-xl font-medium">
                  {project.name}
                </span>
                <Tag className="text-xs text-inherit border-current">{project.type}</Tag>
              </div>
            </AccordionTrigger>
          </DirectionalFillRow>
          <AccordionContent>
            <div className="grid gap-5 pb-2 text-sm text-content/85 sm:grid-cols-12">
              <div className="sm:col-span-5 flex flex-col justify-between gap-4">
                <p className="leading-relaxed">{project.description}</p>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-content/70 transition-colors hover:text-accent"
                  >
                    View project
                    <ArrowUpRightIcon className="size-3.5" />
                  </a>
                ) : null}
              </div>
              <div className="sm:col-span-4">
                <h4 className="mb-2 text-content font-medium">Key achievements</h4>
                <ul className="space-y-2">
                  {project.achievements.map((achievement) => (
                    <li key={achievement} className="relative pl-4 before:absolute before:left-0 before:top-2 before:size-1 before:rounded-full before:bg-content/60">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sm:col-span-3">
                <h4 className="mb-2 text-content font-medium">Technologies</h4>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <li key={technology}>
                      <Tag className="text-xs px-2.5">{technology}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
