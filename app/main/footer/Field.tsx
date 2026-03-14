import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

import styles from './Footer.module.css';

export const Field = ({ children, label, className }: { label: string, children: React.ReactNode, className?: string }) => (
    <FormItem>
        <FormLabel className={cn(styles.formLabel, className)}>{label}</FormLabel>
        <FormControl>
            {children}
        </FormControl>
        <FormMessage />
    </FormItem>
)