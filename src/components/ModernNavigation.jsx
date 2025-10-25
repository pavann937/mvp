import React from 'react';
import { 
  Home, 
  Plus, 
  User, 
  Search, 
  Compass,
  Zap,
  TrendingUp,
  Bell
} from 'lucide-react';

const ModernNavigation = ({ currentView, onViewChange, userProfile }) => {
  const navItems = [
    { 
      id: 'feed', 
      icon: Home, 
      label: 'Home',
      gradient: 'from-blue-500 to-purple-600'
    },
    { 
      id: 'discover', 
      icon: Compass, 
      label: 'Discover',
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      id: 'upload', 
      icon: Plus, 
      label: 'Create', 
      special: true,
      gradient: 'from-pink-500 to-rose-600'
    },
    { 
      id: 'trending', 
      icon: TrendingUp, 
      label: 'Trending',
      gradient: 'from-orange-500 to-red-600'
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Profile',
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Background */}
      <div className="bg-black/30 backdrop-blur-2xl border-t border-white/10">
        <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            if (item.special) {
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className="relative group"
                >
                  {/* Outer Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Main Button */}
                  <div className="relative bg-gradient-to-r from-pink-500 to-rose-600 p-3 rounded-xl shadow-xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                    <Icon className="w-6 h-6 text-white" />
                    
                    {/* Pulse Animation */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </button>
              );
            }
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="relative group flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300"
              >
                {/* Active Background */}
                {isActive && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-20 blur-sm`}></div>
                )}
                
                {/* Icon Container */}
                <div className={`relative p-2 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                    : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`} />
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium mt-1 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div className={`absolute -bottom-1 w-1 h-1 bg-gradient-to-r ${item.gradient} rounded-full`}></div>
                )}
                
                {/* Notification Badge */}
                {item.id === 'profile' && userProfile?.notifications && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Bottom Safe Area */}
        <div className="h-safe-area-inset-bottom bg-black/10"></div>
      </div>
    </div>
  );
};

export default ModernNavigation;
