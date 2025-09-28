import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No results found." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Search className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">No missions found</h3>
      <p className="text-muted-foreground text-center max-w-md">
        {message}
      </p>
    </div>
  );
};

export default EmptyState;