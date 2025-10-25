import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Coins, 
  UserPlus, 
  MessageCircle, 
  Share2, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Clock,
  Star,
  Zap,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

const EnhancedVideoFeed = ({ videos, currentUser, userProfile, onLike, onTip, onHire }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [showControls, setShowControls] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.code === 'ArrowUp') {
        handleScroll('up');
      } else if (e.code === 'ArrowDown') {
        handleScroll('down');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentVideoIndex]);

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            <Play className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20 animate-ping"></div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">No Videos Available</h2>
        <p className="text-gray-400 text-center max-w-md px-6">
          Discover amazing skill tutorials from experts around the world
        </p>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  const handleLike = async (videoId) => {
    if (likedVideos.has(videoId)) return;
    
    setLikedVideos(prev => new Set([...prev, videoId]));
    
    // Create multiple heart animations
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'fixed text-5xl pointer-events-none z-50';
        const randomX = 40 + Math.random() * 20;
        const randomRotate = -20 + Math.random() * 40;
        heart.style.left = `${randomX}%`;
        heart.style.top = '50%';
        heart.style.animation = `heartBurst ${1 + Math.random() * 0.5}s ease-out forwards`;
        heart.style.transform = `rotate(${randomRotate}deg)`;
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
      }, i * 100);
    }
    
    await onLike(videoId);
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
      }
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
  };

  const formatNumber = (num) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || '0';
  };

  return (
    <div 
      className="h-screen overflow-hidden relative bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Container with Smooth Transitions */}
      <div 
        className="h-full w-full relative transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${currentVideoIndex * 100}vh)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen w-full relative group">
            {/* Video Background with Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 animate-pulse" />
              </div>
              
              {/* Video Thumbnail/Embed */}
              {video.videoUrl && (
                <div className="absolute inset-0">
                  {video.thumbnailUrl && (
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
              )}
            </div>

            {/* Top Status Bar - Enhanced */}
            <div className="absolute top-0 left-0 right-0 z-30 pt-6 pb-4 px-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
              <div className="flex items-center justify-between max-w-full">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide">LIVE TUTORIAL</span>
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    LIVE
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/10">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-bold">{formatViews(video.views || 12000)}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/10">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-white text-sm font-bold">{video.duration || '10:30'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Info - Modern Card Design */}
            <div className="absolute bottom-24 left-4 right-20 z-20 max-w-sm">
              {/* Creator Profile */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <img 
                    src={video.channelIcon || `https://ui-avatars.com/api/?name=${video.creatorName}&size=48&background=random`}
                    alt={video.creatorName}
                    className="w-12 h-12 rounded-full border-3 border-white/30 shadow-2xl object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-lg">
                    <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-white fill-current" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-bold text-lg drop-shadow-2xl truncate">
                      @{video.creatorName?.toLowerCase().replace(/\s+/g, '') || 'guru'}
                    </h3>
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-lg">
                      <Award className="w-3 h-3" />
                      <span>PRO</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-200 text-sm font-medium capitalize">{video.skillTag} Expert</span>
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                      <span className="text-yellow-400 text-xs font-bold ml-1">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Info Card */}
              <div className="bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-2xl rounded-xl p-3 border border-white/10 shadow-2xl">
                <h2 className="text-white font-bold text-base mb-2 leading-tight line-clamp-2 drop-shadow-lg">
                  {video.title}
                </h2>
                <p className="text-gray-200 text-sm leading-relaxed mb-3 line-clamp-2 opacity-90">
                  {video.description || `Master ${video.skillTag} with this professional tutorial! Learn step-by-step from an expert. 🚀`}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      #{video.skillTag.toUpperCase()}
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                      {video.uploadedAt || 'Recently uploaded'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold">Trending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Modern Floating Design */}
            <div className="absolute bottom-24 right-3 z-20 flex flex-col space-y-3">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`relative group transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    likedVideos.has(video.id) ? 'animate-bounce' : ''
                  }`}
                >
                  <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
                    likedVideos.has(video.id) 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 opacity-70 animate-pulse' 
                      : 'bg-white/20 opacity-0 group-hover:opacity-50'
                  }`}></div>
                  <div className={`relative p-3 rounded-full transition-all duration-300 shadow-2xl ${
                    likedVideos.has(video.id) 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                      : 'bg-black/40 backdrop-blur-xl border border-white/20 group-hover:bg-black/60'
                  }`}>
                    <Heart 
                      className={`w-5 h-5 transition-all duration-300 ${
                        likedVideos.has(video.id) ? 'text-white fill-white scale-110' : 'text-white'
                      }`} 
                    />
                  </div>
                </button>
                <span className="text-white text-xs mt-2 font-bold drop-shadow-lg">
                  {formatNumber((video.likes || 1250) + (likedVideos.has(video.id) ? 1 : 0))}
                </span>
              </div>

              {/* V-Coin Tip Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onTip(video.id, video.userId)}
                  className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-xl opacity-70 group-hover:opacity-100 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-3 rounded-full shadow-2xl">
                    <Coins className="w-5 h-5 text-white" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-bounce shadow-lg"></div>
                  </div>
                </button>
                <span className="text-white text-xs mt-2 font-bold drop-shadow-lg">{video.tips || 89}</span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <button className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-50"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-3 rounded-full group-hover:bg-black/60 transition-all shadow-2xl">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </button>
                <span className="text-white text-xs mt-2 font-bold drop-shadow-lg">{Math.floor(Math.random() * 200) + 50}</span>
              </div>

              {/* Hire Me Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onHire(video.userId, video.creatorName)}
                  className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full blur-xl opacity-70 group-hover:opacity-100"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-full shadow-2xl">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                </button>
                <span className="text-white text-xs mt-2 font-bold drop-shadow-lg">Hire</span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <button className="relative group transition-all duration-300 transform hover:scale-110 active:scale-95">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-50"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/20 p-3 rounded-full group-hover:bg-black/60 transition-all shadow-2xl">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                </button>
                <span className="text-white text-xs mt-2 font-bold drop-shadow-lg">Share</span>
              </div>
            </div>

            {/* Video Progress Indicators - Sleek Design */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20">
              <div className="flex flex-col space-y-2">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentVideoIndex(idx)}
                    className="group"
                  >
                    <div className={`w-1 rounded-full transition-all duration-300 ${
                      idx === currentVideoIndex 
                        ? 'h-8 bg-white shadow-lg shadow-white/50' 
                        : 'h-1.5 bg-white/40 group-hover:bg-white/60 group-hover:h-4'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause Control Overlay */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
              className="absolute inset-0 z-10 cursor-pointer"
            >
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="bg-black/50 backdrop-blur-xl rounded-full p-6 transform transition-transform duration-300 hover:scale-110 shadow-2xl border border-white/10">
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white" />
                  ) : (
                    <Play className="w-12 h-12 text-white fill-white" />
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Swipe Hint - Elegant */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none opacity-75">
        <div className="bg-black/70 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/10 shadow-xl">
          <p className="text-white text-xs font-medium">Swipe for more</p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedVideoFeed;
