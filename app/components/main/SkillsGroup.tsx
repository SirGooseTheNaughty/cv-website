import { Tag } from "./Tag";

type SkillsGroupProps = {
  title: string;
  skills: string[];
};

export function SkillsGroup({ title, skills }: SkillsGroupProps) {
  return (
    <article className="grid gap-4 border-b border-stroke pb-6 sm:grid-cols-12">
      <h3 className="sm:col-span-4 text-xl font-medium text-content">
        {title}
      </h3>
      <ul className="sm:col-span-8 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill}>
            <Tag>{skill}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
