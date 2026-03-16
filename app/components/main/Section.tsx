import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-10 sm:py-14", className)}>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-4xl font-semibold uppercase tracking-[-0.02em] text-content">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
