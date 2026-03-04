'use client'

import Image from 'next/image'

interface ProductImageProps {
  productId: string
  productName: string
  className?: string
}

const productImageMap: Record<string, string> = {
  'hi-vis-polo': '/store/hi-vis-polo.svg',
  'work-shirt': '/store/work-shirt.svg',
  'safety-vest': '/store/safety-vest.svg',
  'cap': '/store/cap.svg',
  'beanie': '/store/beanie.svg',
  'sticker-pack': '/store/sticker-pack.svg',
  'lanyard': '/store/lanyard.svg',
  'tote-bag': '/store/tote-bag.svg',
  'hoodie': '/store/hoodie.svg',
  'polo-casual': '/store/polo-casual.svg',
  'welcome-bundle': '/store/welcome-bundle.svg',
  'hard-hat': '/store/hard-hat.svg',
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}

function PlaceholderSvg({ name }: { name: string }) {
  const initials = getInitials(name)
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="400" height="400" fill="#050505" />
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="none"
        stroke="#1a1a2e"
        strokeWidth="1"
      />
      <rect
        x="120"
        y="130"
        width="160"
        height="140"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2"
        rx="2"
      />
      <text
        x="200"
        y="210"
        fontFamily="sans-serif"
        fontWeight="bold"
        fontSize="48"
        fill="#0d9488"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {initials}
      </text>
      <text
        x="200"
        y="310"
        fontFamily="sans-serif"
        fontSize="14"
        fill="#9CA3AF"
        textAnchor="middle"
        letterSpacing="2"
      >
        NRPG STORE
      </text>
    </svg>
  )
}

export default function ProductImage({
  productId,
  productName,
  className = '',
}: ProductImageProps) {
  const imagePath = productImageMap[productId]

  if (!imagePath) {
    return (
      <div className={`relative aspect-square bg-[#050505] ${className}`}>
        <PlaceholderSvg name={productName} />
      </div>
    )
  }

  return (
    <div className={`relative aspect-square bg-[#050505] ${className}`}>
      <Image
        src={imagePath}
        alt={productName}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}
