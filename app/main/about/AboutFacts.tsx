"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/button/Button";

import styles from './About.module.css';

const AboutFact = (
    { className, groupIndex, factIndex, children }:
    { className: string, groupIndex: number, factIndex: number, children: React.ReactNode }
) => {
    return (
        <motion.p
            className={cn(styles.aboutFact, className)}
            key={`${groupIndex}-${factIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, translateX: '-5%' }}
            transition={{ delay: factIndex * 0.1 }}
        >
            <span className="text-accent">/* </span> 
            {children}
            <span className="text-accent"> */</span>
        </motion.p>
    )
}

export const AboutFacts = () => {
    const [active, setActive] = useState<number>(0);

    const stepImageAnimationProps = {
        initial: { clipPath: 'inset(0% 0% 100% 0%)' },
        animate: { clipPath: 'inset(0% 0% 0% 0%)' },
        exit: { clipPath: 'inset(100% 0% 0% 0%)' }
    };

    const stepFactAnimationProps = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, translateX: '-5%' },
    };

    const steps = [
        {
            image: <motion.img
                key={1}
                className={styles.aboutImage}
                src="/images/about/about-1.png"
                alt="fact 1"
                {...stepImageAnimationProps}
            />,
            facts: [
                {
                    className: styles.first,
                    content: <>
                        I hold an honored Master’s degree in automated control systems, 
                        that’s where my handy engineer’s thinking comes from 
                    </>
                },
                {
                    className: styles.second,
                    content: <>
                        Can't live without music, and I have played as a drummer in two rock bands
                    </>
                },
                {
                    className: styles.third,
                    content: <>
                        My wife is a top-tier web designer and a great source of inspiration! 
                        Check <a href="https://dyotanya.com/" className="text-accent">her website </a> 
                        out and maybe you’ll have something to talk about too!
                    </>
                },
            ]
        },
        {
            image: <motion.img
                className={styles.aboutImage}
                key={2}
                src="/images/about/about-2.png"
                alt="fact 2"
                {...stepImageAnimationProps}
            />,
            facts: [
                {
                    className: styles.fourth,
                    content: <>
                        I hold an honored Master’s degree in automated control systems, 
                        that’s where my handy engineer’s thinking comes from 
                    </>
                },
                {
                    className: styles.fifth,
                    content: <>
                        Can't live without music, and I have played as a drummer in two rock bands
                    </>
                },
                {
                    className: styles.sixth,
                    content: <>
                        My wife is a top-tier web designer and a great source of inspiration! 
                        Check <a href="https://dyotanya.com/" target="_blank" className="text-accent">her website </a> 
                        out and maybe you’ll have something to talk about too!
                    </>
                },
            ]
        }
    ]

    return (
        <div className="h-full flex flex-col items-center">
            <div className="w-full grow mb-8 relative">
                <div className={styles.aboutImageContainer}>
                    <AnimatePresence>{steps[active].image}</AnimatePresence>
                </div>

                <div className={styles.aboutFactsContainer}>
                    <AnimatePresence>
                        {steps[active].facts.map((fact, index) => (
                            <AboutFact
                                key={`${active}-${index}`}
                                groupIndex={active}
                                factIndex={index}
                                className={fact.className}
                            >
                                {fact.content}
                            </AboutFact>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <Button onClick={() => setActive((active + 1) % steps.length)}>give me more!</Button>
        </div>
    )
};
