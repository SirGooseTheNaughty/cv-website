type SectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export const Section = ({ title, children, className = "" }: SectionProps) => (
  <section className={`mb-8 ${className}`}>
    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
      {title}
    </h2>
    {children}
  </section>
);