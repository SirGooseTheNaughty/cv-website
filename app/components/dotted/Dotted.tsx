import { cn } from '@/lib/utils';

import styles from './Dotted.module.css';

export const Dotted = ({ children, classNames }: { children: React.ReactNode, classNames?: string }) => (
    <div className={cn(styles.dotted, classNames)}>
        {children}
    </div>
);
