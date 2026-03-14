type ExperienceItemProps = {
  title: string;
  company?: string;
  period: string;
  location?: string;
  description: string[];
};

export const ExperienceItem = ({ title, company, period, location, description }: ExperienceItemProps) => (
  <div className="mb-6 last:mb-0">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {company && <p className="text-blue-600 font-medium">{company}</p>}
      </div>
      <div className="text-sm text-gray-600 mt-1 sm:mt-0 sm:text-right">
        <div>{period}</div>
        {location && <div className="mt-1">{location}</div>}
      </div>
    </div>
    <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
      {description.map((item, index) => (
        <li key={index} className="text-sm leading-snug">{item}</li>
      ))}
    </ul>
  </div>
);