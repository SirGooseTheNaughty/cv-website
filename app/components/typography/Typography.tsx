import { cn } from '@/lib/utils';

import styles from './Typography.module.css';

export const H2 = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => {
    return (
        <h2 className={cn(styles.heading, styles.h2, classNames)}>
            {children}
        </h2>
    );
};

export const H3 = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => {
    return (
        <h3 className={cn(styles.heading, styles.h3, classNames)}>
            {children}
        </h3>
    );
};

export const Text = ({ children, size, classNames }: { children: React.ReactNode, size?: 'small' | 'large', classNames?: string }) => {
    return (
        <p className={cn(styles.text, size && styles[size], classNames)}>
            {children}
        </p>
    );
};