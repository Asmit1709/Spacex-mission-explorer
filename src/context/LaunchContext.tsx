import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Launch, LaunchContextType } from '@/types/spacex';
import { fetchLaunches as fetchLaunchesApi } from '@/services/spacexApi';

const LaunchContext = createContext<LaunchContextType | undefined>(undefined);

export const useLaunchContext = () => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error('useLaunchContext must be used within a LaunchProvider');
  }
  return context;
};

interface LaunchProviderProps {
  children: ReactNode;
}

export const LaunchProvider: React.FC<LaunchProviderProps> = ({ children }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [successOnly, setSuccessOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('spacex-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('spacex-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLaunchesApi();
      setLaunches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch missions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // Filter launches based on search criteria
  const filteredLaunches = launches.filter(launch => {
    const matchesSearch = launch.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !selectedYear || selectedYear === 'all' || new Date(launch.date_utc).getFullYear().toString() === selectedYear;
    const matchesSuccess = !successOnly || launch.success === true;
    const matchesFavorites = !showFavoritesOnly || favorites.includes(launch.id);
    
    return matchesSearch && matchesYear && matchesSuccess && matchesFavorites;
  });

  const contextValue: LaunchContextType = {
    launches,
    filteredLaunches,
    loading,
    error,
    searchTerm,
    selectedYear,
    successOnly,
    favorites,
    showFavoritesOnly,
    setSearchTerm,
    setSelectedYear,
    setSuccessOnly,
    toggleFavorite,
    setShowFavoritesOnly,
    fetchLaunches,
  };

  return (
    <LaunchContext.Provider value={contextValue}>
      {children}
    </LaunchContext.Provider>
  );
};