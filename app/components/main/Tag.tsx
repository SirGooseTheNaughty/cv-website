import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

export function Tag({ children, className, asChild }: TagProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn("inline-flex items-center rounded-full border border-stroke px-3 py-1 text-sm text-content/75", className)}>
      {children}
    </Comp>
  );
}
