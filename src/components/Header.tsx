import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useLaunchContext } from '@/context/LaunchContext';

const Header: React.FC = () => {
  const { showFavoritesOnly, setShowFavoritesOnly, favorites } = useLaunchContext();

  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            🚀 SpaceX Mission Explorer
          </h1>
          
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites ({favorites.length})
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;