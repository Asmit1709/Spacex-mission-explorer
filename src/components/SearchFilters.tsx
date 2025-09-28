import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useLaunchContext } from '@/context/LaunchContext';

const SearchFilters: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedYear,
    setSelectedYear,
    successOnly,
    setSuccessOnly,
    launches,
  } = useLaunchContext();

  // Get unique years from launches
  const years = React.useMemo(() => {
    const yearSet = new Set(
      launches.map(launch => new Date(launch.date_utc).getFullYear().toString())
    );
    return Array.from(yearSet).sort((a, b) => b.localeCompare(a));
  }, [launches]);

  return (
    <div className="bg-card rounded-xl p-6 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search missions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input pl-10"
          />
        </div>

        {/* Year Filter */}
        <Select value={selectedYear || "all"} onValueChange={(value) => setSelectedYear(value === "all" ? "" : value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Years" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Success Filter */}
        <div className="flex items-center space-x-2 md:min-w-[180px]">
          <Switch
            id="success-only"
            checked={successOnly}
            onCheckedChange={setSuccessOnly}
          />
          <Label htmlFor="success-only" className="text-sm">
            Successful only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;