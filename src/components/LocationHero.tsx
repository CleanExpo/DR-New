interface LocationHeroProps {
  suburb: string;
  city: string;
  title: string;
  subtitle: string;
  image?: string;
  tier?: string;
}

export const LocationHero: React.FC<LocationHeroProps> = ({
  suburb,
  city,
  title,
  subtitle,
  image,
  tier
}) => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-blue-100">{subtitle}</p>
        <div className="mt-8">
          <a href="/claim" className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-lg inline-block">
            Get Emergency Help Now
          </a>
        </div>
      </div>
    </div>
  );
};