import React from 'react';
import { LaunchProvider } from '@/context/LaunchContext';
import Header from '@/components/Header';
import SearchFilters from '@/components/SearchFilters';
import MissionGrid from '@/components/MissionGrid';

const Index = () => {
  return (
    <LaunchProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <SearchFilters />
          <MissionGrid />
        </main>
      </div>
    </LaunchProvider>
  );
};

export default Index;
