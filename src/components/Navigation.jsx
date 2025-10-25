import React from 'react';
import { Home, Plus, User, Search, Compass } from 'lucide-react';

const Navigation = ({ currentView, onViewChange, userProfile }) => {
  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'discover', icon: Compass, label: 'Discover' },
    { id: 'upload', icon: Plus, label: 'Create', special: true },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-200/90 backdrop-blur-xl border-t border-white/10">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          if (item.special) {
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="relative p-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
