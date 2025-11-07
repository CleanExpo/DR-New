interface TriageInfoCardProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const TriageInfoCard: React.FC<TriageInfoCardProps> = ({
  title,
  description,
  icon,
  children
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      {icon && <div className="mb-4">{icon}</div>}
      {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  );
};