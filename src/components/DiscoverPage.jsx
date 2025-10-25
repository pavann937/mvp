import React, { useState, useEffect } from 'react';
import { 
  Search, 
  TrendingUp, 
  Star, 
  Play, 
  Users, 
  Clock,
  Filter,
  Grid3X3,
  List,
  Zap
} from 'lucide-react';
import { getTrendingSkills, fetchVideosBySkill } from '../services/videoService';

const DiscoverPage = ({ onVideoSelect, onSkillSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [trendingSkills, setTrendingSkills] = useState([]);
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const skills = getTrendingSkills();
        setTrendingSkills(skills);
        
        // Load featured videos from different skills
        const featured = await fetchVideosBySkill('plumbing', 6);
        setFeaturedVideos(featured);
      } catch (error) {
        console.error('Error loading discover data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = [
    { id: 'all', name: 'All Skills', icon: '🎯' },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
    { id: 'welding', name: 'Welding', icon: '⚡' },
    { id: 'carpentry', name: 'Carpentry', icon: '🪚' },
    { id: 'electrical', name: 'Electrical', icon: '💡' },
    { id: 'gardening', name: 'Gardening', icon: '🌱' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
    { id: 'cooking', name: 'Cooking', icon: '👨‍🍳' },
    { id: 'painting', name: 'Painting', icon: '🎨' }
  ];

  const handleSkillClick = async (skillId) => {
    setSelectedCategory(skillId);
    if (skillId !== 'all') {
      setLoading(true);
      try {
        const videos = await fetchVideosBySkill(skillId, 12);
        setFeaturedVideos(videos);
      } catch (error) {
        console.error('Error loading skill videos:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-2xl border-b border-white/20">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-black text-white">Discover</h1>
              <p className="text-gray-300 text-sm font-medium">Find amazing skill tutorials</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5 text-white" /> : <Grid3X3 className="w-5 h-5 text-white" />}
              </button>
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-105">
                <Filter className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for skills, tutorials, or creators..."
              className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-xl transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Trending Skills */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Trending Skills</h2>
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-black px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-lg">
              Hot
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {trendingSkills.slice(0, 6).map((skill, index) => (
              <button
                key={index}
                onClick={() => onSkillSelect?.(skill.name.toLowerCase())}
                className="bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:from-black/50 hover:to-black/30 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <h3 className="text-white font-bold text-sm">{skill.name}</h3>
                <p className="text-gray-400 text-xs font-medium">{skill.count}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSkillClick(category.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl border border-blue-400/50'
                    : 'bg-black/40 backdrop-blur-sm text-gray-300 hover:bg-black/60 hover:text-white border border-white/20'
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span className="font-semibold text-sm whitespace-nowrap">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Videos */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              {selectedCategory === 'all' ? 'Featured Videos' : `${categories.find(c => c.id === selectedCategory)?.name} Videos`}
            </h2>
            <button className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors">
              View All
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-4 animate-pulse">
                  <div className="aspect-video bg-white/20 rounded-xl mb-3"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
              {featuredVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => onVideoSelect?.(video)}
                  className={`group bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:from-black/50 hover:to-black/30 hover:border-white/40 transition-all duration-300 transform hover:scale-105 ${
                    viewMode === 'list' ? 'flex space-x-4 p-4' : 'p-4'
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-32 h-20' : 'aspect-video'} bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl overflow-hidden`}>
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className={`${viewMode === 'list' ? 'flex-1' : 'mt-3'} text-left`}>
                    <h3 className="text-white font-bold text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 font-medium">{video.creatorName}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs font-medium">{video.views ? `${Math.floor(video.views / 1000)}K` : '1.2K'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-amber-400 fill-current" />
                          <span className="text-gray-400 text-xs font-medium">4.9</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider">
                        #{video.skillTag.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="w-6 h-6 text-amber-400" />
            <h3 className="text-white font-bold text-lg">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/30 rounded-xl p-3 transition-all hover:scale-105">
              <TrendingUp className="w-5 h-5 text-orange-400 mb-2" />
              <span className="text-white text-sm font-semibold">Trending Now</span>
            </button>
            <button className="bg-black/40 hover:bg-black/60 border border-white/20 hover:border-white/30 rounded-xl p-3 transition-all hover:scale-105">
              <Star className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-white text-sm font-semibold">Top Rated</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
