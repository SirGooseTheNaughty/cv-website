type AwardItemProps = {
  title: string;
  organization: string;
  year: string;
  project: string;
  url?: string;
};

export const AwardItem = ({ title, organization, year, project, url }: AwardItemProps) => {
    const content = (
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
            <div className="flex flex-row justify-between items-center gap-1">
                <h3 className="text-gray-900">
                    <span className="font-semibold">{title}</span>
                    <span className="text-sm text-gray-700 mb-1">{' '}— {organization}</span>
                </h3>
                <span className="text-sm text-gray-600">{year}</span>
            </div>
            <p className="text-sm font-medium text-blue-600">
                {project}
            </p>
        </div>
    );

    return url ? <a href={url} target="_blank" rel="noopener noreferrer">{content}</a> : content;
}