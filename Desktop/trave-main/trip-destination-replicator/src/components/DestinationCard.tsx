
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageSwitcher';

interface DestinationCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  description: string;
  className?: string;
}

const DestinationCard = ({
  id,
  title,
  location,
  image,
  rating,
  description,
  className,
}: DestinationCardProps) => {
  const { t } = useLanguage();

  // 使用翻译后的标题、位置和描述
  const localizedTitle = t(id) || title;
  const localizedLocation = t(location.toLowerCase()) || location;
  const localizedDescription = t(`${id}_description`) || description;

  return (
    <div className={cn(
      "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col",
      className
    )}>
      <Link to={`/destination/${id}`} className="block relative h-40 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={localizedTitle}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </Link>
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-gray-800">{localizedTitle}</h3>
          <div className="flex items-center gap-1 bg-travel-orange/10 text-travel-orange px-2 py-1 rounded-full">
            <Star className="h-4 w-4 fill-travel-orange text-travel-orange" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{localizedLocation}</span>
        </div>
        <p className="mt-3 text-gray-600 text-sm line-clamp-3">{localizedDescription}</p>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link
            to={`/destination/${id}`}
            className="text-travel-blue font-medium text-sm hover:underline"
          >
            {t('explore destination')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
