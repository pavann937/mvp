import React from 'react';
import { 
  Home, 
  Plus, 
  User, 
  Compass,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const EnhancedNavigation = ({ currentView, onViewChange, userProfile }) => {
  const navItems = [
    { 
      id: 'feed', 
      icon: Home, 
      label: 'Home',
      gradient: 'from-blue-500 via-blue-600 to-purple-600',
      shadowColor: 'shadow-blue-500/50'
    },
    { 
      id: 'discover', 
      icon: Compass, 
      label: 'Discover',
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      shadowColor: 'shadow-emerald-500/50'
    },
    { 
      id: 'upload', 
      icon: Plus, 
      label: 'Create', 
      special: true,
      gradient: 'from-pink-500 via-rose-500 to-red-600',
      shadowColor: 'shadow-pink-500/50'
    },
    { 
      id: 'trending', 
      icon: TrendingUp, 
      label: 'Trending',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      shadowColor: 'shadow-orange-500/50'
    },
    { 
      id: 'profile', 
      icon: User, 
      label: 'Profile',
      gradient: 'from-purple-500 via-violet-600 to-indigo-600',
      shadowColor: 'shadow-purple-500/50'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Main Navigation Container */}
      <div className="pointer-events-auto">
        {/* Glassmorphism Background with Blur */}
        <div className="relative bg-black/40 backdrop-blur-2xl border-t border-white/10">
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <div className="flex items-center justify-around py-3 px-2 max-w-md mx-auto relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              if (item.special) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className="relative group -mt-6"
                  >
                    {/* Outer Glow Effect */}
                    <div className={`absolute -inset-3 bg-gradient-to-r ${item.gradient} rounded-full blur-xl opacity-60 group-hover:opacity-100 group-active:opacity-80 transition-all duration-300`}></div>
                    
                    {/* Main Button */}
                    <div className={`relative bg-gradient-to-r ${item.gradient} p-4 rounded-full ${item.shadowColor} shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-95`}>
                      <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                      
                      {/* Sparkle Effect */}
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                      </div>
                      
                      {/* Rotating Border */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin-slow"></div>
                    </div>
                    
                    {/* Label */}
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  </button>
                );
              }
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className="relative group flex flex-col items-center transition-all duration-300"
                >
                  {/* Active Background Glow */}
                  {isActive && (
                    <>
                      <div className={`absolute -inset-3 bg-gradient-to-r ${item.gradient} rounded-full blur-xl opacity-40 animate-pulse`}></div>
                      <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} rounded-full blur-lg opacity-60`}></div>
                    </>
                  )}
                  
                  {/* Icon Container */}
                  <div className={`relative z-10 p-3 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${item.gradient} ${item.shadowColor} shadow-xl transform scale-110` 
                      : 'bg-white/10 group-hover:bg-white/20 backdrop-blur-sm border border-white/10'
                  }`}>
                    <Icon className={`w-6 h-6 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} strokeWidth={isActive ? 2.5 : 2} />
                    
                    {/* Active Dot Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-semibold mt-1.5 transition-all duration-300 ${
                    isActive 
                      ? 'text-white scale-105' 
                      : 'text-gray-400 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Notification Badge */}
                  {item.id === 'profile' && userProfile?.notifications && (
                    <div className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-bounce">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom Safe Area for Mobile Devices */}
          <div className="h-safe-area-inset-bottom bg-gradient-to-b from-black/40 to-black/60"></div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNavigation;
