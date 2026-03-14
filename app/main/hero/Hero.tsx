import { ReactElement } from "react";
import Image from 'next/image';
import { Button } from "@/app/components/button/Button";
import { Text } from "@/app/components/typography/Typography";
import { Dotted } from "@/app/components/dotted/Dotted";

import styles from './Hero.module.css';

const HeroFooterEntry = ({ label, value, onClick }: { label: string, value: ReactElement | string, onClick?: () => void }) => {
    return (
        <Dotted>
            <Text size="small">
                <span className="text-accent mr-1">{label}</span>
                {typeof value === "string" ? <span>{value}</span> : value}
            </Text>
        </Dotted>
    );
};

export const Hero = () => {
    return (
        <section className="hero h-svh flex flex-col bg-bg-2">
          <div className="flex-1 px-10 grid grid-cols-2 gap-4 items-center">
            <Image className="w-[10em] aspect-square bg-bg-1" src="/images/profile-pic.png" alt="Hero Image" width={160} height={160} />
            <div className="flex flex-col gap-6">
                <Text>
                    <span className="text-accent block">/*</span>
                    <span>sharing my love to neat websites with<br /> your future users with attention and care</span>
                    <span className="text-accent block">*/</span>
                </Text>

                <Button>get in touch</Button>
            </div>
          </div>
          <h1 className={styles.title}>Sergey V.</h1>
          <div className="flex justify-between px-10">
            <HeroFooterEntry label="Valencia, Spain" value={"10:25 am"} />
            <HeroFooterEntry label="available:" value={'from January'} />
            <HeroFooterEntry label="shuffle" value={'theme'} />
            <HeroFooterEntry label="sound:" value={'on/off'} />
          </div>
        </section>
    );
};
