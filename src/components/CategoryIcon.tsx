import React from 'react';
import {
  Zap,
  Wrench,
  Wind,
  Sparkles,
  Hammer,
  Paintbrush,
  Tv,
  ShieldAlert,
  Car,
  Scissors,
  Truck,
  LayoutGrid
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Zap':
      return <Zap className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Hammer':
      return <Hammer className={className} />;
    case 'Paintbrush':
      return <Paintbrush className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'Scissors':
      return <Scissors className={className} />;
    case 'Truck':
      return <Truck className={className} />;
    case 'LayoutGrid':
    default:
      return <LayoutGrid className={className} />;
  }
};
