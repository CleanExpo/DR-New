import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  darkMode?: boolean;
}

/**
 * Disaster Recovery Logo Component
 * Simple, clean logo for local Brisbane disaster recovery service
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className,
  showText = false,
  darkMode = false
}) => {
  // Size mappings
  const sizeConfig = {
    sm: { width: 32, height: 32, textSize: 'text-sm' },
    md: { width: 48, height: 48, textSize: 'text-base' },
    lg: { width: 64, height: 64, textSize: 'text-lg' },
    xl: { width: 96, height: 96, textSize: 'text-xl' }
  };

  const config = sizeConfig[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <Image
          src="/logos/3D Disaster Recovery Logo Image.png"
          alt="Disaster Recovery Brisbane"
          width={config.width}
          height={config.height}
          className={cn(
            'object-contain',
            darkMode && 'brightness-0 invert'
          )}
          priority
        />
      </div>

      {showText && (
        <div className={cn('flex flex-col', config.textSize)}>
          <span className={cn(
            'font-bold',
            darkMode ? 'text-white' : 'text-gray-900'
          )}>
            Disaster Recovery
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Header Logo Component
 * Specifically for use in the site header/navbar
 */
export const HeaderLogo: React.FC<{ darkMode?: boolean }> = ({ darkMode }) => {
  return (
    <Logo
      size="md"
      showText={false}
      darkMode={darkMode}
      className="cursor-pointer hover:opacity-90 transition-opacity"
    />
  );
};

export default Logo;