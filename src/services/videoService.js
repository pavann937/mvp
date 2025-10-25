// YouTube Video Service for SkilSnap
const RAPIDAPI_KEY = '13294eb2ffmsh1f0161fd8d6a78dp1c42a4jsn7cc8dd289f0d';
const RAPIDAPI_HOST = 'simple-youtube-search.p.rapidapi.com';

// Skill-based search queries
const SKILL_QUERIES = {
  plumbing: 'plumbing repair tutorial',
  welding: 'welding techniques tutorial',
  carpentry: 'carpentry woodworking tutorial',
  electrical: 'electrical wiring tutorial',
  gardening: 'gardening tips tutorial',
  automotive: 'car repair tutorial',
  cooking: 'cooking techniques tutorial',
  painting: 'painting techniques tutorial',
  construction: 'construction techniques tutorial',
  repair: 'home repair tutorial'
};

/**
 * Fetch videos from YouTube API based on skill
 */
export const fetchVideosBySkill = async (skillTag = 'tutorial', limit = 10) => {
  try {
    const query = SKILL_QUERIES[skillTag] || `${skillTag} tutorial`;
    const encodedQuery = encodeURIComponent(query);
    
    const response = await fetch(`https://simple-youtube-search.p.rapidapi.com/search?query=${encodedQuery}&type=video&safesearch=false`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform YouTube data to SkilSnap format
    return data.results?.slice(0, limit).map((video, index) => ({
      id: video.id,
      title: video.title,
      skillTag: skillTag,
      userId: `creator_${index}`,
      creatorName: video.channel.name,
      videoUrl: `https://www.youtube.com/embed/${video.id}`,
      thumbnailUrl: video.thumbnail.url,
      likes: Math.floor(Math.random() * 1000) + 50,
      tips: Math.floor(Math.random() * 100) + 10,
      views: video.views || 0,
      duration: video.duration_formatted,
      uploadedAt: video.uploadedAt,
      description: `Learn ${skillTag} with this amazing tutorial! ${video.title}`,
      channelIcon: video.channel.icon
    })) || [];
    
  } catch (error) {
    console.error('Error fetching videos:', error);
    
    // Fallback to demo data if API fails
    return getFallbackVideos(skillTag);
  }
};

/**
 * Fetch mixed skill videos for main feed
 */
export const fetchMixedSkillVideos = async () => {
  try {
    const skills = ['plumbing', 'welding', 'carpentry', 'electrical', 'gardening'];
    const allVideos = [];
    
    for (const skill of skills) {
      const videos = await fetchVideosBySkill(skill, 3);
      allVideos.push(...videos);
    }
    
    // Shuffle videos for diverse feed
    return shuffleArray(allVideos);
    
  } catch (error) {
    console.error('Error fetching mixed videos:', error);
    return getFallbackVideos();
  }
};

/**
 * Search videos by query
 */
export const searchVideos = async (searchQuery) => {
  try {
    const encodedQuery = encodeURIComponent(`${searchQuery} tutorial`);
    
    const response = await fetch(`https://simple-youtube-search.p.rapidapi.com/search?query=${encodedQuery}&type=video&safesearch=false`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    const data = await response.json();
    
    return data.results?.slice(0, 20).map((video, index) => ({
      id: video.id,
      title: video.title,
      skillTag: extractSkillFromTitle(video.title),
      userId: `creator_${index}`,
      creatorName: video.channel.name,
      videoUrl: `https://www.youtube.com/embed/${video.id}`,
      thumbnailUrl: video.thumbnail.url,
      likes: Math.floor(Math.random() * 1000) + 50,
      tips: Math.floor(Math.random() * 100) + 10,
      views: video.views || 0,
      duration: video.duration_formatted,
      channelIcon: video.channel.icon
    })) || [];
    
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

/**
 * Get fallback videos when API fails
 */
const getFallbackVideos = (skillTag = 'mixed') => {
  const fallbackVideos = [
    {
      id: 'demo1',
      title: 'Professional Plumbing Repair Techniques',
      skillTag: 'plumbing',
      userId: 'guru1',
      creatorName: 'Master Plumber Pro',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg',
      likes: 1250,
      tips: 89,
      views: 45000,
      duration: '8:45',
      channelIcon: 'https://via.placeholder.com/40x40/4f46e5/ffffff?text=MP'
    },
    {
      id: 'demo2',
      title: 'Advanced Welding Techniques for Beginners',
      skillTag: 'welding',
      userId: 'guru2',
      creatorName: 'Weld Master Sarah',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg',
      likes: 890,
      tips: 156,
      views: 32000,
      duration: '12:30',
      channelIcon: 'https://via.placeholder.com/40x40/7c3aed/ffffff?text=WM'
    },
    {
      id: 'demo3',
      title: 'Carpentry Masterclass: Building Furniture',
      skillTag: 'carpentry',
      userId: 'guru3',
      creatorName: 'Carpenter Mike',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg',
      likes: 2100,
      tips: 234,
      views: 78000,
      duration: '15:20',
      channelIcon: 'https://via.placeholder.com/40x40/f59e0b/ffffff?text=CM'
    }
  ];
  
  if (skillTag === 'mixed') {
    return fallbackVideos;
  }
  
  return fallbackVideos.filter(video => video.skillTag === skillTag);
};

/**
 * Extract skill tag from video title
 */
const extractSkillFromTitle = (title) => {
  const titleLower = title.toLowerCase();
  
  for (const [skill, query] of Object.entries(SKILL_QUERIES)) {
    if (titleLower.includes(skill)) {
      return skill;
    }
  }
  
  return 'tutorial';
};

/**
 * Shuffle array utility
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get trending skills
 */
export const getTrendingSkills = () => {
  return [
    { name: 'Plumbing', icon: '🔧', count: '2.3K videos' },
    { name: 'Welding', icon: '⚡', count: '1.8K videos' },
    { name: 'Carpentry', icon: '🪚', count: '3.1K videos' },
    { name: 'Electrical', icon: '💡', count: '1.5K videos' },
    { name: 'Gardening', icon: '🌱', count: '2.7K videos' },
    { name: 'Automotive', icon: '🚗', count: '1.9K videos' },
    { name: 'Cooking', icon: '👨‍🍳', count: '4.2K videos' },
    { name: 'Painting', icon: '🎨', count: '1.2K videos' }
  ];
};
