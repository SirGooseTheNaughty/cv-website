type ContactItemProps = {
  label?: string;
  href?: string;
  children: React.ReactNode;
};

export const ContactItem = ({ label, href, children }: ContactItemProps) => {
  const content = (
    <div className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
      {label && <span className="font-medium text-gray-500 mr-2">{label}:</span>}
      {children}
    </div>
  );

  return href ? (
    <a href={href} className="block" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
};