import { cn } from "@/lib/utils";

import styles from './Section.module.css';

export const Section = ({ children, classNames, ...rest }: { children: React.ReactNode, classNames?: string, [key: string]: any }) => {
    return <section className={cn('px-10', styles.section, classNames)} {...rest}>{children}</section>;
};