import Link from "next/link";

import styles from './FlippingLink.module.css';

export const FlippingLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Link href={href} className={styles.flipping}>
            <span className={styles.flippingLabel} data-text={children}>
                {children}
            </span>
        </Link>
    );
};