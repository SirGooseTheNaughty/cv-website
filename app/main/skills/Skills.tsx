import { Section } from "@/app/components/section/Section";
import { H2, Text } from "@/app/components/typography/Typography";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import styles from './Skills.module.css';

interface Skill {
    name: string;
    proficiency: number; // 1 to 5
    love: number; // 1 to 5
}

const SkillLevel = ({ level }: { level: number }) => (
    <div className={styles.skillLevel}>
        {[...Array(5)].map((_, index) => (
            <div key={index} className={cn(styles.skillLevelDot , index < level && styles.skillLevelDotActive)}></div>
        ))}
    </div>
)

const SkillRow = ({ name, proficiency, love }: Skill) => {
    return (
        <div className={cn(styles.skillsGrid, styles.skillsRow)}>
            <p>{name}</p>
            <SkillLevel level={proficiency} />
            <SkillLevel level={love} />
        </div>
    )
};

export const Skills = () => {
    return (
        <Section id="skills">
            <H2 classNames="mb-8 flex justify-between">
                What <span className="text-accent mr-auto">I can</span> & what <span className="text-accent">I love</span>
            </H2>

            <div>
                <div>
                    <div className={cn("opacity-50", styles.skillsGrid)}>
                        <p>title</p>
                        <p>skill</p>
                        <p>love</p>
                    </div>
                    <SkillRow name="JavaScript" proficiency={5} love={5} />
                    <SkillRow name="HTML & CSS" proficiency={5} love={5} />
                    <SkillRow name="React" proficiency={4} love={5} />
                    <SkillRow name="Webflow" proficiency={4} love={4} />
                    <SkillRow name="AWS" proficiency={2} love={4} />
                    <SkillRow name="Node.js" proficiency={3} love={3} />
                </div>

                <div className="flex gap-4 mt-8">
                    <p className="opacity-50 mr-8">and also...</p>
                    <div className="flex flex-wrap gap-2">
                        <p className={styles.skillAlsoEntry}>TypeScript</p>
                        <p className={styles.skillAlsoEntry}>SASS</p>
                        <p className={styles.skillAlsoEntry}>styled-components</p>
                        <p className={styles.skillAlsoEntry}>Jest</p>
                        <p className={styles.skillAlsoEntry}>Vite</p>
                        <p className={styles.skillAlsoEntry}>Webpack</p>
                        <p className={styles.skillAlsoEntry}>Next.js</p>
                    </div>
                </div>
            </div>
        </Section>
    )
};
