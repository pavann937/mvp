import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Coins,
  UserPlus,
  Eye,
  Clock,
  Star,
  Verified,
  MapPin
} from 'lucide-react';

const UltraModernVideoFeed = ({ videos, currentUser, userProfile, onLike, onTip, onHire }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Simulate video progress
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => (prev + 1) % 100);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center animate-pulse">
            <Play className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full blur opacity-30 animate-ping"></div>
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
    
    // Create floating heart animation
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.className = 'fixed text-6xl pointer-events-none z-50 animate-bounce';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.animation = 'heartBurst 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
    await onLike(videoId);
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setProgress(0);
    } else if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setProgress(0);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || '0';
  };

  return (
    <div className="h-screen overflow-hidden relative bg-black">
      {/* Video Container */}
      <div 
        className="h-full w-full relative transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${currentVideoIndex * 100}vh)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen w-full relative group">
            {/* Video Background */}
            <div className="absolute inset-0">
              {/* YouTube Video Embed */}
              <iframe
                ref={el => videoRefs.current[index] = el}
                src={`${video.videoUrl}?autoplay=${index === currentVideoIndex && isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${video.id}`}
                className="w-full h-full object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40" />
            </div>

            {/* Top Status Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 p-6 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-red-500/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-semibold">LIVE</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{formatNumber(video.views)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
                    <span className="text-white text-sm font-medium">{video.duration}</span>
                  </div>
                  <button className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 hover:bg-black/60 transition-colors">
                    <MoreHorizontal className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Creator Info - Redesigned */}
            <div className="absolute bottom-24 left-6 right-24 z-20">
              {/* Creator Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img 
                    src={video.channelIcon || `https://ui-avatars.com/api/?name=${video.creatorName}&background=6366f1&color=fff&size=64`}
                    alt={video.creatorName}
                    className="w-14 h-14 rounded-2xl border-3 border-white/30 object-cover shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  <Verified className="absolute -top-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full p-0.5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-bold text-lg truncate">
                      @{video.creatorName?.toLowerCase().replace(/\s+/g, '') || 'creator'}
                    </h3>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      PRO
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-300 text-sm capitalize">{video.skillTag} Expert</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-gray-300 text-xs">4.9</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">Mumbai</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Title & Description */}
              <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
                <h2 className="text-white font-bold text-xl mb-3 leading-tight">
                  {video.title}
                </h2>
                
                <p className="text-gray-200 text-sm leading-relaxed mb-4 line-clamp-2">
                  {video.description || `Master ${video.skillTag} with this professional tutorial! 🚀 Perfect for beginners and professionals alike.`}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      #{video.skillTag?.toUpperCase()}
                    </div>
                    <span className="text-gray-400 text-xs">{video.uploadedAt || 'Recently uploaded'}</span>
                  </div>
                  
                  <button 
                    onClick={() => onHire(video.userId, video.creatorName)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Hire Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Panel - Redesigned */}
            <div className="absolute bottom-24 right-6 z-20 flex flex-col space-y-6">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    likedVideos.has(video.id) 
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-2xl shadow-red-500/50' 
                      : 'bg-black/40 backdrop-blur-xl hover:bg-black/60 border border-white/20'
                  }`}
                >
                  <Heart 
                    className={`w-7 h-7 transition-all duration-300 ${
                      likedVideos.has(video.id) ? 'text-white fill-current scale-110' : 'text-white'
                    }`} 
                  />
                  {likedVideos.has(video.id) && (
                    <>
                      <div className="absolute inset-0 animate-ping bg-red-500/30 rounded-2xl"></div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-50"></div>
                    </>
                  )}
                </button>
                <span className="text-white text-sm font-bold mt-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  {formatNumber((video.likes || 0) + (likedVideos.has(video.id) ? 1 : 0))}
                </span>
              </div>

              {/* V-Coin Tip Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onTip(video.id, video.userId)}
                  className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl shadow-yellow-500/50"
                >
                  <Coins className="w-7 h-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl blur opacity-40"></div>
                </button>
                <span className="text-white text-sm font-bold mt-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  {video.tips || 0}
                </span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <button className="bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:bg-black/60 active:scale-95">
                  <MessageCircle className="w-7 h-7 text-white" />
                </button>
                <span className="text-white text-sm font-bold mt-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
                  {Math.floor(Math.random() * 500) + 50}
                </span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <button className="bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:bg-black/60 active:scale-95">
                  <Bookmark className="w-7 h-7 text-white" />
                </button>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <button className="bg-black/40 backdrop-blur-xl border border-white/20 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 hover:bg-black/60 active:scale-95">
                  <Share className="w-7 h-7 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-20">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleScroll('up')}
                  disabled={currentVideoIndex === 0}
                  className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/60 transition-colors disabled:opacity-30"
                >
                  <ChevronUp className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex flex-col space-y-1 py-2">
                  {videos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentVideoIndex(idx);
                        setProgress(0);
                      }}
                      className={`w-1 h-8 rounded-full transition-all duration-300 ${
                        idx === currentVideoIndex 
                          ? 'bg-white shadow-lg shadow-white/50' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => handleScroll('down')}
                  disabled={currentVideoIndex === videos.length - 1}
                  className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/60 transition-colors disabled:opacity-30"
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Video Controls */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              onDoubleClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <div className="bg-black/50 backdrop-blur-md rounded-full p-6 border border-white/20 animate-pulse">
                  <Play className="w-12 h-12 text-white" />
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/60 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/20 hover:bg-black/60 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Areas */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3 z-10 cursor-pointer" 
        onClick={() => handleScroll('up')}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-1/3 z-10 cursor-pointer" 
        onClick={() => handleScroll('down')}
      />
    </div>
  );
};

export default UltraModernVideoFeed;
