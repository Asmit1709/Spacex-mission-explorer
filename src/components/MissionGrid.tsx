import React, { useState } from 'react';
import { Launch } from '@/types/spacex';
import { useLaunchContext } from '@/context/LaunchContext';
import MissionCard from './MissionCard';
import MissionDetail from './MissionDetail';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

const MissionGrid: React.FC = () => {
  const { filteredLaunches, loading, error, fetchLaunches, showFavoritesOnly } = useLaunchContext();
  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={fetchLaunches} />;
  }

  if (filteredLaunches.length === 0) {
    const message = showFavoritesOnly 
      ? "No favorite missions yet. Star some missions to see them here!"
      : "Try adjusting your search filters.";
    return <EmptyState message={message} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaunches.map((launch) => (
          <MissionCard
            key={launch.id}
            launch={launch}
            onShowDetails={setSelectedLaunch}
          />
        ))}
      </div>

      <MissionDetail
        launch={selectedLaunch}
        isOpen={selectedLaunch !== null}
        onClose={() => setSelectedLaunch(null)}
      />
    </>
  );
};

export default MissionGrid;