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
            <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-8 pb-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-red-600 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-bold tracking-wide">LIVE</span>
                  </div>
                  <div className="flex items-center space-x-1.5 bg-black/50 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-white/20">
                    <Eye className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-semibold">{formatNumber(video.views)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="bg-black/50 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/20">
                    <span className="text-white text-xs font-semibold">{video.duration}</span>
                  </div>
                  <button className="p-2 bg-black/50 backdrop-blur-md rounded-lg border border-white/20 hover:bg-black/70 transition-all hover:scale-105">
                    <MoreHorizontal className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Creator Info - Redesigned */}
            <div className="absolute bottom-24 left-4 right-20 z-20">
              {/* Creator Profile */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={video.channelIcon || `https://ui-avatars.com/api/?name=${video.creatorName}&background=3b82f6&color=fff&size=64`}
                    alt={video.creatorName}
                    className="w-12 h-12 rounded-xl border-2 border-white/40 object-cover shadow-2xl"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-lg"></div>
                  <Verified className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 bg-white rounded-full p-0.5 shadow-lg" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-white font-bold text-base truncate drop-shadow-lg">
                      {video.creatorName || 'Expert Creator'}
                    </h3>
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide shadow-lg">
                      PRO
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-wrap">
                    <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                      <span className="text-gray-200 text-xs font-medium capitalize">{video.skillTag} Expert</span>
                    </div>
                    <div className="flex items-center space-x-0.5 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-amber-400 fill-current" />
                      ))}
                      <span className="text-gray-200 text-xs font-semibold ml-1">5.0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Title & Description */}
              <div className="bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-2xl rounded-2xl p-4 border border-white/20 shadow-2xl">
                <h2 className="text-white font-bold text-base mb-2 leading-snug drop-shadow-lg">
                  {video.title}
                </h2>

                <p className="text-gray-100 text-xs leading-relaxed mb-3 line-clamp-2 drop-shadow">
                  {video.description || `Master ${video.skillTag} with this professional tutorial! Learn step-by-step from an expert.`}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                      #{video.skillTag?.toUpperCase()}
                    </div>
                    <span className="text-gray-300 text-[10px] font-medium">{video.uploadedAt || 'Recently uploaded'}</span>
                  </div>

                  <button
                    onClick={() => onHire(video.userId, video.creatorName)}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
                  >
                    Hire Me
                  </button>
                </div>
              </div>
            </div>

            {/* Right Action Panel - Redesigned */}
            <div className="absolute bottom-24 right-3 z-20 flex flex-col space-y-4">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`relative p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    likedVideos.has(video.id)
                      ? 'bg-gradient-to-br from-red-500 to-pink-600 shadow-xl shadow-red-500/40'
                      : 'bg-black/50 backdrop-blur-xl hover:bg-black/70 border border-white/30'
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 transition-all duration-300 ${
                      likedVideos.has(video.id) ? 'text-white fill-current scale-110' : 'text-white'
                    }`}
                  />
                  {likedVideos.has(video.id) && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-50"></div>
                  )}
                </button>
                <span className="text-white text-xs font-bold mt-1.5 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-lg drop-shadow-lg">
                  {formatNumber((video.likes || 0) + (likedVideos.has(video.id) ? 1 : 0))}
                </span>
              </div>

              {/* V-Coin Tip Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onTip(video.id, video.userId)}
                  className="relative bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-xl shadow-amber-500/40"
                >
                  <Coins className="w-6 h-6 text-white drop-shadow-lg" />
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-300 rounded-full animate-bounce"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-red-500 rounded-xl blur opacity-40"></div>
                </button>
                <span className="text-white text-xs font-bold mt-1.5 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-lg drop-shadow-lg">
                  {video.tips || 0}
                </span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center">
                <button className="bg-black/50 backdrop-blur-xl border border-white/30 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/70 active:scale-95">
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-bold mt-1.5 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-lg drop-shadow-lg">
                  {Math.floor(Math.random() * 500) + 50}
                </span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center">
                <button className="bg-black/50 backdrop-blur-xl border border-white/30 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/70 active:scale-95">
                  <Bookmark className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center">
                <button className="bg-black/50 backdrop-blur-xl border border-white/30 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/70 active:scale-95">
                  <Share className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
              <div className="flex flex-col space-y-1.5">
                <button
                  onClick={() => handleScroll('up')}
                  disabled={currentVideoIndex === 0}
                  className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 hover:bg-black/70 transition-all disabled:opacity-20 hover:scale-110"
                >
                  <ChevronUp className="w-4 h-4 text-white" />
                </button>

                <div className="flex flex-col space-y-1 py-1">
                  {videos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentVideoIndex(idx);
                        setProgress(0);
                      }}
                      className={`w-1 h-6 rounded-full transition-all duration-300 ${
                        idx === currentVideoIndex
                          ? 'bg-white shadow-lg shadow-white/50'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleScroll('down')}
                  disabled={currentVideoIndex === videos.length - 1}
                  className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 hover:bg-black/70 transition-all disabled:opacity-20 hover:scale-110"
                >
                  <ChevronDown className="w-4 h-4 text-white" />
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
            <div className="absolute bottom-6 left-4 z-20 flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2.5 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 hover:bg-black/70 transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2.5 bg-black/50 backdrop-blur-md rounded-lg border border-white/30 hover:bg-black/70 transition-all hover:scale-105"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Areas */}
      <div
        className="absolute inset-x-0 top-0 h-1/4 z-10 cursor-pointer"
        onClick={() => handleScroll('up')}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/4 z-10 cursor-pointer"
        onClick={() => handleScroll('down')}
      />
    </div>
  );
};

export default UltraModernVideoFeed;
