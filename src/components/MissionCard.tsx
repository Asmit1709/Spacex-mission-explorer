import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, Info } from 'lucide-react';
import { Launch } from '@/types/spacex';
import { useLaunchContext } from '@/context/LaunchContext';

interface MissionCardProps {
  launch: Launch;
  onShowDetails: (launch: Launch) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ launch, onShowDetails }) => {
  const { favorites, toggleFavorite } = useLaunchContext();
  const isFavorite = favorites.includes(launch.id);
  const launchDate = new Date(launch.date_utc);
  const year = launchDate.getFullYear();

  return (
    <div className="mission-card group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {launch.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
            <span>•</span>
            <span>Flight #{launch.flight_number}</span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleFavorite(launch.id)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Star 
            className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`} 
          />
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div 
              className={`w-3 h-3 rounded-full ${
                launch.success === true 
                  ? 'bg-success' 
                  : launch.success === false 
                    ? 'bg-destructive' 
                    : 'bg-muted-foreground'
              }`}
            />
            <Badge 
              variant={launch.success === true ? 'default' : 'secondary'}
              className="text-xs"
            >
              {launch.success === true ? 'Success' : launch.success === false ? 'Failed' : 'Unknown'}
            </Badge>
          </div>
        </div>

        <Button
          onClick={() => onShowDetails(launch)}
          className="btn-space"
          size="sm"
        >
          <Info className="w-4 h-4 mr-2" />
          Details
        </Button>
      </div>
    </div>
  );
};

export default MissionCard;