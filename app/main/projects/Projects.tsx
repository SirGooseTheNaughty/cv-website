import { getAllProjects, Project } from "@/lib/projects";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { H2, Text } from "@/app/components/typography/Typography";
import { LinkButton } from "@/app/components/button/Button";

import styles from './Projects.module.css';
import { Section } from "@/app/components/section/Section";
import { FreelanceIcon, ContractIcon } from "@/app/components/icons/Icons";

const ProjectCard = ({ title, type, isFreelance, year, team, role, timeSpent, slug, image }: Project) => {
    return (
        <div className={cn("grid grid-cols-2 rounded-md bg-bg-2", styles.projectCard)}>
            <div className="flex flex-col justify-between p-8">
                <div className="flex justify-between align-top">
                    <div className={styles.projectHeader}>
                        <h3 className={styles.projectTitle}>{title}</h3>
                        <Text size="small">{type}</Text>
                    </div>
                    {isFreelance ? <FreelanceIcon classNames={styles.projectIcon} /> : <ContractIcon classNames={styles.projectIcon} />}
                </div>
                <div>
                    <div className="pb-6">
                        <p className={styles.projectChar}>
                            <span className="opacity-50">year</span>
                            <span>{year}</span>
                        </p>
                        <p className={styles.projectChar}>
                            <span className="opacity-50">team</span>
                            <span>{team}</span>
                        </p>
                        <p className={styles.projectChar}>
                            <span className="opacity-50">role</span>
                            <span>{role}</span>
                        </p>
                        <p className={styles.projectChar}>
                            <span className="opacity-50">time spent</span>
                            <span>{timeSpent}</span>
                        </p>
                    </div>

                    <LinkButton href={`/projects/${slug}`}>view case study</LinkButton>
                </div>
            </div>
            <Image className="w-full h-full" src={`/images/${image}`} alt={`${title} image`} width={800} height={800} />
        </div>
    );
};

export const Projects = () => {
    const projects = getAllProjects();

    return (
        <Section id="projects">
            <H2 classNames="mb-8"><span className="text-accent block">Projects</span> I can brag about</H2>

            <div className="flex flex-col gap-4">
                {projects.map(project => (
                    <ProjectCard key={project.slug} {...project} />
                ))}
            </div>
        </Section>
    )
};
