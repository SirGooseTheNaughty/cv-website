import { Section } from "@/app/components/section/Section";
import { H2, H3, Text } from "@/app/components/typography/Typography";
import { cn } from "@/lib/utils";
import { ProcessStartIcon } from "@/app/components/icons/Icons";

import styles from './Process.module.css';

export const Process = () => {
    return (
        <Section id="process">
            <H2 classNames="mb-8 flex flex-col">
                How it all <span className="text-accent mr-auto">works</span>
            </H2>

            <div className="grid grid-cols-3 grid-rows-2">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <p>start</p>
                        <ProcessStartIcon classNames={styles.processStartIcon} />
                    </div>
                </div>

                <div className={cn(styles.processStep, styles.colored, styles.orange)}>
                    <Text size="small">// 01</Text>
                    <H3 classNames={styles.processStepTitle}>You get in touch with me</H3>
                    <p>
                        The best way to do so is via the form, this way I’ll know most of the basics 
                        of the project right away and won’t annoy you with extra questions right away
                    </p>
                </div>

                <div className={cn(styles.processStep)}>
                    <Text size="small">// 02</Text>
                    <H3 classNames={styles.processStepTitle}>We set up a call</H3>
                    <p>
                        It’s a crucial step for us to get to know each other and discuss the project in details. 
                        I promise, it won’t be “a call that could’ve been an email”
                    </p>
                </div>

                <div className={cn(styles.processStep, styles.colored, styles.green)}>
                    <Text size="small">// 03</Text>
                    <H3 classNames={styles.processStepTitle}>I give it a think and compose an offer </H3>
                    <p>
                        I’ll give you a room for manuever suggesting multiple technologies and approaches, 
                        so you’ll be able to pick an option (and a budget!) that fits you best
                    </p>
                </div>

                <div className={cn(styles.processStep)}>
                    <Text size="small">// 04</Text>
                    <H3 classNames={styles.processStepTitle}>We sign a contract and kick the process off</H3>
                    <p>
                        It’s needed to create boundaries for the both of the parties. 
                        Life is much easier when there are no understatements!
                    </p>
                </div>

                <div className={cn(styles.processStep, styles.colored, styles.blue)}>
                    <Text size="small">// 05</Text>
                    <H3 classNames={styles.processStepTitle}>I do the magic, you make sure it’s as awesome as we agreed</H3>
                    <p>
                        With a proper planning and discussion all you’ll have to do is look at our creation in awe. 
                        But just in case — you’ll be able to tweak some bits if you feel like it. 
                        After all, we both want it to be a banger!
                    </p>
                </div>
            </div>
        </Section>
    )
};
