export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details: string | null;
  links: {
    patch?: {
      small?: string;
      large?: string;
    };
    wikipedia?: string;
    webcast?: string;
    article?: string;
  };
  rocket: string;
  launchpad: string;
  flight_number: number;
  date_unix: number;
}

export interface LaunchContextType {
  launches: Launch[];
  filteredLaunches: Launch[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedYear: string;
  successOnly: boolean;
  favorites: string[];
  showFavoritesOnly: boolean;
  setSearchTerm: (term: string) => void;
  setSelectedYear: (year: string) => void;
  setSuccessOnly: (success: boolean) => void;
  toggleFavorite: (id: string) => void;
  setShowFavoritesOnly: (show: boolean) => void;
  fetchLaunches: () => Promise<void>;
}