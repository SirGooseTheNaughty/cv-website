export const Skills = ({ title, skills = [] }: { title: string; skills?: string[] }) => {
    return (
        <div>
            <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};
