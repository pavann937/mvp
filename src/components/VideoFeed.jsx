import React, { useState, useEffect } from 'react';
import { Heart, Coins, UserPlus, MessageCircle, Share, Play, Pause } from 'lucide-react';

const VideoFeed = ({ videos, currentUser, userProfile, onLike, onTip, onHire }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedVideos, setLikedVideos] = useState(new Set());

  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-dark-300 to-dark-200">
        <div className="animate-pulse mb-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-primary" />
          </div>
        </div>
        <p className="text-gray-400 text-lg">No videos available</p>
        <p className="text-gray-500 text-sm mt-2">Check back later for new content!</p>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  const handleLike = async (videoId) => {
    if (likedVideos.has(videoId)) return;
    
    setLikedVideos(prev => new Set([...prev, videoId]));
    await onLike(videoId);
  };

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScroll = (direction) => {
    if (direction === 'up' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    } else if (direction === 'down' && currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Video Container */}
      <div 
        className="h-full w-full relative transition-transform duration-300"
        style={{ transform: `translateY(-${currentVideoIndex * 100}vh)` }}
      >
        {videos.map((video, index) => (
          <div key={video.id} className="h-screen w-full relative">
            {/* Video Background with Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-indigo-900/80"
              style={{ 
                background: `linear-gradient(135deg, ${video.videoUrl || '#4f46e5'} 0%, #1e1b4b 100%)`
              }}
              onClick={handleVideoClick}
            >
              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-black/50 rounded-full p-4">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
              )}

              {/* Video Content Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <span className="text-3xl">🔧</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {video.title}
                    </h2>
                    <p className="text-xl text-gray-200 drop-shadow">
                      #{video.skillTag}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Creator Info */}
            <div className="absolute bottom-24 left-4 z-20 max-w-[70%]">
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center ring-2 ring-white/20">
                    <span className="text-white font-bold text-lg">
                      {video.creatorName?.charAt(0) || 'G'}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-lg drop-shadow">
                    @{video.creatorName?.toLowerCase().replace(' ', '') || 'guru'}
                  </p>
                  <p className="text-gray-200 text-sm drop-shadow">
                    {video.skillTag} Expert
                  </p>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <p className="text-white text-sm leading-relaxed">
                  Learn {video.title.toLowerCase()} step by step! 
                  Perfect for beginners. 💡 #SkilSnap #{video.skillTag}
                </p>
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div className="absolute bottom-24 right-4 z-20 flex flex-col space-y-6">
              {/* Like Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    likedVideos.has(video.id) 
                      ? 'bg-red-500 shadow-lg shadow-red-500/30' 
                      : 'bg-black/30 backdrop-blur-sm hover:bg-black/50'
                  }`}
                >
                  <Heart 
                    className={`w-7 h-7 transition-colors ${
                      likedVideos.has(video.id) ? 'text-white fill-current' : 'text-white'
                    }`} 
                  />
                  {likedVideos.has(video.id) && (
                    <div className="absolute inset-0 animate-ping bg-red-500/30 rounded-full"></div>
                  )}
                </button>
                <span className="text-white text-xs mt-1 font-semibold">
                  {(video.likes || 0) + (likedVideos.has(video.id) ? 1 : 0)}
                </span>
              </div>

              {/* V-Coin Tip Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onTip(video.id, video.userId)}
                  className="relative bg-gradient-to-r from-accent to-yellow-500 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-accent/30"
                >
                  <Coins className="w-7 h-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </button>
                <span className="text-white text-xs mt-1 font-semibold">
                  {video.tips || 0}
                </span>
              </div>

              {/* Comments Button */}
              <div className="flex flex-col items-center">
                <button className="bg-black/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-black/50">
                  <MessageCircle className="w-7 h-7 text-white" />
                </button>
                <span className="text-white text-xs mt-1 font-semibold">
                  {Math.floor(Math.random() * 50) + 5}
                </span>
              </div>

              {/* Hire Me Button */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => onHire(video.userId, video.creatorName)}
                  className="bg-gradient-to-r from-primary to-secondary p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-primary/30"
                >
                  <UserPlus className="w-7 h-7 text-white" />
                </button>
                <span className="text-white text-xs mt-1 font-semibold">
                  Hire
                </span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center">
                <button className="bg-black/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-black/50">
                  <Share className="w-7 h-7 text-white" />
                </button>
                <span className="text-white text-xs mt-1 font-semibold">
                  Share
                </span>
              </div>
            </div>

            {/* Navigation Indicators */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
              <div className="flex flex-col space-y-2">
                {videos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1 h-8 rounded-full transition-all ${
                      idx === currentVideoIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Navigation */}
      <div className="absolute inset-x-0 top-0 h-1/3 z-10" onClick={() => handleScroll('up')} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 z-10" onClick={() => handleScroll('down')} />
    </div>
  );
};

export default VideoFeed;
