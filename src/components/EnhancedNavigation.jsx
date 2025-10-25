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
      gradient: 'from-blue-500 to-cyan-600',
      shadowColor: 'shadow-blue-500/40'
    },
    {
      id: 'discover',
      icon: Compass,
      label: 'Discover',
      gradient: 'from-teal-500 to-emerald-600',
      shadowColor: 'shadow-teal-500/40'
    },
    {
      id: 'upload',
      icon: Plus,
      label: 'Create',
      special: true,
      gradient: 'from-rose-500 to-pink-600',
      shadowColor: 'shadow-rose-500/50'
    },
    {
      id: 'trending',
      icon: TrendingUp,
      label: 'Trending',
      gradient: 'from-orange-500 to-amber-600',
      shadowColor: 'shadow-orange-500/40'
    },
    {
      id: 'profile',
      icon: User,
      label: 'Profile',
      gradient: 'from-slate-600 to-slate-700',
      shadowColor: 'shadow-slate-600/40'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      {/* Main Navigation Container */}
      <div className="pointer-events-auto">
        {/* Glassmorphism Background with Blur */}
        <div className="relative bg-gradient-to-t from-black/90 via-black/80 to-black/70 backdrop-blur-xl border-t border-white/20">
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          <div className="flex items-center justify-around py-2.5 px-3 max-w-md mx-auto relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              if (item.special) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className="relative group -mt-5"
                  >
                    {/* Outer Glow Effect */}
                    <div className={`absolute -inset-2.5 bg-gradient-to-r ${item.gradient} rounded-full blur-lg opacity-50 group-hover:opacity-80 group-active:opacity-60 transition-all duration-300`}></div>

                    {/* Main Button */}
                    <div className={`relative bg-gradient-to-br ${item.gradient} p-3.5 rounded-full ${item.shadowColor} shadow-xl transform transition-all duration-300 group-hover:scale-110 group-active:scale-95 border-2 border-white/20`}>
                      <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />

                      {/* Sparkle Effect */}
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                      </div>
                    </div>

                    {/* Label */}
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
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
                    <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} rounded-xl blur-md opacity-40`}></div>
                  )}

                  {/* Icon Container */}
                  <div className={`relative z-10 p-2.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-br ${item.gradient} ${item.shadowColor} shadow-lg transform scale-105 border border-white/30`
                      : 'bg-white/5 group-hover:bg-white/15 backdrop-blur-sm border border-white/10'
                  }`}>
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} strokeWidth={isActive ? 2.5 : 2} />

                    {/* Active Dot Indicator */}
                    {isActive && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg"></div>
                    )}
                  </div>

                  {/* Label */}
                  <span className={`text-[10px] font-bold mt-1 transition-all duration-300 drop-shadow-lg ${
                    isActive
                      ? 'text-white scale-105'
                      : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Notification Badge */}
                  {item.id === 'profile' && userProfile?.notifications && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 border border-white/30">
                      <span className="text-white text-[8px] font-bold">!</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Bottom Safe Area for Mobile Devices */}
          <div className="h-safe-area-inset-bottom bg-black/90"></div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedNavigation;
