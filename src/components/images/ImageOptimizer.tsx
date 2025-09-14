'use client';

import Image from 'next/image';

export const CaseStudyImage = ({
  src,
  alt,
  title
}: {
  src: string;
  alt: string;
  title?: string;
}) => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        title={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export const siteImages = {
  // Placeholder for site images
};