import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Coins, 
  UserPlus, 
  MessageCircle, 
  Share, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Clock,
  Star,
  Zap
} from 'lucide-react';

const ModernVideoFeed = ({ videos, currentUser, userProfile, onLike, onTip, onHire }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [showControls, setShowControls] = useState(false);
  const videoRefs = useRef([]);

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
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
            <Play className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-20 animate-ping"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mt-6 mb-2">No Videos Available</h2>
        <p className="text-gray-400 text-center max-w-sm">
          Discover amazing skill tutorials from experts around the world
        </p>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  const handleLike = async (videoId) => {
    if (likedVideos.has(videoId)) return;
    
    setLikedVideos(prev => new Set([...prev, videoId]));
    
    // Heart animation
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'fixed text-4xl pointer-events-none z-50 animate-bounce';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(heart);
    
    setTimeout(() => {
      heart.style.animation = 'heartFloat 1s ease-out forwards';
      setTimeout(() => heart.remove(), 1000);
    }, 500);
    
    await onLike(videoId);
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
  };

  return (
    <div className="h-screen overflow-hidden relative bg-black">
      {/* Video Container */}
      <div 
        className="h-full w-full relative transition-transform duration-500 ease-out"
        style={{ transform: `translateY(-${currentVideoIndex * 100}vh)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen w-full relative group">
            {/* YouTube Video Embed */}
            <div className="absolute inset-0">
              <iframe
                ref={el => videoRefs.current[index] = el}
                src={`${video.videoUrl}?autoplay=${index === currentVideoIndex && isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 p-4 bg-gradient-to-b from-black/50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE TUTORIAL</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{formatViews(video.views)}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <Clock className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{video.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Creator Info - Enhanced */}
            <div className="absolute bottom-28 left-4 right-20 z-20 max-w-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <img 
                    src={video.channelIcon || `https://via.placeholder.com/40x40/4f46e5/ffffff?text=${video.creatorName?.charAt(0) || 'G'}`}
                    alt={video.creatorName}
                    className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-bold text-base drop-shadow-lg truncate">
                      @{video.creatorName?.toLowerCase().replace(/\s+/g, '') || 'guru'}
                    </h3>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                      PRO
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-200 text-sm capitalize truncate">{video.skillTag} Expert</span>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-300 text-xs ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Title & Description */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl p-3 border border-white/10">
                <h2 className="text-white font-bold text-base mb-2 leading-tight line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-gray-200 text-sm leading-relaxed mb-2 line-clamp-2">
                  {video.description || `Master ${video.skillTag} with this professional tutorial! 🚀 #SkilSnap #${video.skillTag}`}
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    #{video.skillTag.toUpperCase()}
                  </div>
                  <span className="text-gray-400 text-xs">{video.uploadedAt || 'Recently uploaded'}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="absolute bottom-28 right-4 z-20 flex flex-col space-y-3">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                    likedVideos.has(video.id) 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50' 
                      : 'bg-black/30 backdrop-blur-md hover:bg-black/50 border border-white/20'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 transition-colors ${
                      likedVideos.has(video.id) ? 'text-white fill-current' : 'text-white'
                    }`} 
                  />
                  {likedVideos.has(video.id) && (
                    <div className="absolute inset-0 animate-ping bg-red-500/30 rounded-xl"></div>
                  )}
                </button>
                <span className="text-white text-xs mt-2 font-bold">
                  {formatViews((video.likes || 0) + (likedVideos.has(video.id) ? 1 : 0))}
                </span>
              </div>

              {/* V-Coin Tip Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onTip(video.id, video.userId)}
                  className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-yellow-500/50"
                >
                  <Coins className="w-5 h-5 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
                </button>
                <span className="text-white text-xs mt-2 font-bold">{video.tips || 0}</span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <button className="bg-black/30 backdrop-blur-md border border-white/20 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/50">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-xs mt-2 font-bold">{Math.floor(Math.random() * 100) + 20}</span>
              </div>

              {/* Hire Me Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onHire(video.userId, video.creatorName)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/50"
                >
                  <UserPlus className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-xs mt-2 font-bold">Hire</span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <button className="bg-black/30 backdrop-blur-md border border-white/20 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/50">
                  <Share className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-xs mt-2 font-bold">Share</span>
              </div>
            </div>

            {/* Video Progress Indicators */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
              <div className="flex flex-col space-y-1">
                {videos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentVideoIndex(idx)}
                    className={`w-1 h-6 rounded-full transition-all duration-300 ${
                      idx === currentVideoIndex 
                        ? 'bg-white shadow-lg' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Controls Overlay */}
            <div 
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                showControls ? 'opacity-100' : 'opacity-0'
              }`}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-md rounded-2xl p-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Navigation Areas */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3 z-10 cursor-pointer" 
        onClick={() => handleScroll('up')}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-1/3 z-10 cursor-pointer" 
        onClick={() => handleScroll('down')}
      />

      {/* Floating Action Hint */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-black/50 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
          <p className="text-white text-xs font-medium">Swipe up/down or use arrow keys</p>
        </div>
      </div>
    </div>
  );
};

export default ModernVideoFeed;
