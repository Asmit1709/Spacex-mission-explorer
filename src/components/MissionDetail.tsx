import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, ExternalLink, Play, BookOpen, X } from 'lucide-react';
import { Launch } from '@/types/spacex';
import { useLaunchContext } from '@/context/LaunchContext';

interface MissionDetailProps {
  launch: Launch | null;
  isOpen: boolean;
  onClose: () => void;
}

const MissionDetail: React.FC<MissionDetailProps> = ({ launch, isOpen, onClose }) => {
  const { favorites, toggleFavorite } = useLaunchContext();

  if (!launch) return null;

  const isFavorite = favorites.includes(launch.id);
  const launchDate = new Date(launch.date_utc);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-foreground pr-8">
              {launch.name}
            </DialogTitle>
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

          {/* Mission Patch */}
          {launch.links.patch?.large && (
            <div className="flex justify-center">
              <img
                src={launch.links.patch.large}
                alt={`${launch.name} mission patch`}
                className="w-32 h-32 object-contain rounded-lg bg-muted/20 p-2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Mission Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Launch Date</p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {launchDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Mission Status</p>
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
                >
                  {launch.success === true ? 'Success' : launch.success === false ? 'Failed' : 'Unknown'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Mission Details */}
          {launch.details && (
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Mission Details</h3>
              <p className="text-muted-foreground leading-relaxed">
                {launch.details}
              </p>
            </div>
          )}

          {/* External Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Links</h3>
            <div className="flex flex-wrap gap-3">
              {launch.links.wikipedia && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="w-4 h-4" />
                    Wikipedia
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              
              {launch.links.webcast && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4" />
                    Webcast
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
              
              {launch.links.article && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="flex items-center gap-2"
                >
                  <a href={launch.links.article} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Article
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Flight Number */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Flight Number: <span className="font-mono">{launch.flight_number}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MissionDetail;