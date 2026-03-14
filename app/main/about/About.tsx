import { cn } from "@/lib/utils";
import { Section } from "@/app/components/section/Section";
import { H2 } from "@/app/components/typography/Typography";
import { AboutFacts } from "./AboutFacts";

import styles from './About.module.css';

export const About = () => {
    return (
        <Section id="about" classNames={cn("h-screen flex flex-col", styles.aboutSection)}>
            <H2 classNames="mb-8 flex relative z-1">
                I'm also <span className={styles.titleShifted}>a <span className="text-accent">real</span></span> <span className="ml-auto">person!</span>
            </H2>

            <div className="grow">
                <AboutFacts />
            </div>
        </Section>
    )
};
