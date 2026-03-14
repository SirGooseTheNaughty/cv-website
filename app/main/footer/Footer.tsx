import { Section } from "@/app/components/section/Section";
import { H2 } from "@/app/components/typography/Typography";
import Image from 'next/image';
import { Dotted } from "@/app/components/dotted/Dotted";
import { FooterForm } from "./FooterForm";

import styles from './Footer.module.css';

export const Footer = () => {
    return (
        <Section id="contact" classNames={styles.footerSection}>
            <H2 classNames="flex flex-col">
                Don't hesitate
                <span>
                    to fill in
                    <span className="text-accent"> the form!</span>
                </span>
            </H2>

            <div className={styles.footerContent}>
                <div>
                    <Image className="w-[10em] aspect-square bg-bg-1" src="/images/profile-pic.png" alt="Hero Image" width={160} height={160} />
                </div>

                <FooterForm />
            </div>

            <div className={styles.footerContact}>
                <p className="opacity-50">You can also contact me via:</p>
                <div className={styles.footerContactLinks}>
                    <Dotted>
                        <a href="mailto:syvorobyev@gmail.com">Email</a>
                    </Dotted>
                    <Dotted>
                        <a href="https://t.me/SirGooseTheNaughty">Telegram</a>
                    </Dotted>
                    <Dotted>
                        <a href="https://wa.me/34624706206">WhatsApp</a>
                    </Dotted>
                </div>
            </div>
        </Section>
    );
};
