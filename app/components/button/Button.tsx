"use client";

import { cn } from '@/lib/utils';

import styles from './Button.module.css';
import Link from 'next/link';
import { EnterIcon } from '../icons/Icons';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    icon?: React.ReactNode;
    classNames?: string;
    href?: string;
    [key: string]: any;
}

export const Button = ({ children, onClick, classNames, ...rest }: ButtonProps) => {
    return (
        <button className={cn(styles.button, classNames)} onClick={onClick} {...rest}>
            <EnterIcon classNames={styles.buttonIcon} />
            {children}
        </button>
    );
};

export const LinkButton = ({ children, href, icon, classNames, ...rest }: ButtonProps) => {
    return (
        <Link href={href as string} className={cn(styles.button, classNames)} {...rest}>
            <EnterIcon classNames={styles.buttonIcon} />
            {children}
        </Link>
    );
};
