import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit,
  runTransaction,
  serverTimestamp
} from 'firebase/firestore';

/**
 * Get collection references based on app structure
 */
export const getCollectionRefs = (db, appId) => ({
  // User profiles (private)
  userProfiles: (userId) => doc(db, `artifacts/${appId}/users/${userId}/profiles/profile`),
  
  // Public videos collection
  videos: collection(db, `artifacts/${appId}/public/data/videos`),
  
  // Individual video document
  video: (videoId) => doc(db, `artifacts/${appId}/public/data/videos/${videoId}`)
});

/**
 * Create user profile in Firestore
 */
export const createUserProfile = async (db, appId, userId, profileData) => {
  try {
    const { userProfiles } = getCollectionRefs(db, appId);
    const profileRef = userProfiles(userId);
    
    const defaultProfile = {
      name: profileData.name || '',
      skillTag: profileData.skillTag || '',
      location: profileData.location || '',
      vCoins: 0,
      isGuru: profileData.isGuru || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(profileRef, defaultProfile);
    console.log('User profile created successfully');
    return defaultProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Get user profile from Firestore
 */
export const getUserProfile = async (db, appId, userId) => {
  try {
    const { userProfiles } = getCollectionRefs(db, appId);
    const profileRef = userProfiles(userId);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data();
    } else {
      console.log('No user profile found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Listen to user profile changes in real-time
 */
export const listenToUserProfile = (db, appId, userId, callback) => {
  const { userProfiles } = getCollectionRefs(db, appId);
  const profileRef = userProfiles(userId);
  
  return onSnapshot(profileRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error listening to user profile:', error);
  });
};

/**
 * Create a new video document
 */
export const createVideo = async (db, appId, videoData) => {
  try {
    const { videos } = getCollectionRefs(db, appId);
    
    const newVideo = {
      userId: videoData.userId,
      title: videoData.title,
      skillTag: videoData.skillTag,
      videoUrl: videoData.videoUrl || '',
      likes: 0,
      tips: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(videos, newVideo);
    console.log('Video created with ID:', docRef.id);
    return { id: docRef.id, ...newVideo };
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

/**
 * Listen to videos feed in real-time
 */
export const listenToVideosFeed = (db, appId, callback, limitCount = 50) => {
  const { videos } = getCollectionRefs(db, appId);
  const videosQuery = query(
    videos, 
    orderBy('createdAt', 'desc'), 
    limit(limitCount)
  );
  
  return onSnapshot(videosQuery, (querySnapshot) => {
    const videosList = [];
    querySnapshot.forEach((doc) => {
      videosList.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(videosList);
  }, (error) => {
    console.error('Error listening to videos feed:', error);
  });
};

/**
 * Handle V-Coin tipping transaction
 */
export const tipVideo = async (db, appId, videoId, creatorId, tipAmount = 10) => {
  try {
    const { video, userProfiles } = getCollectionRefs(db, appId);
    const videoRef = video(videoId);
    const creatorProfileRef = userProfiles(creatorId);
    
    await runTransaction(db, async (transaction) => {
      // Get current video data
      const videoDoc = await transaction.get(videoRef);
      if (!videoDoc.exists()) {
        throw new Error('Video does not exist');
      }
      
      // Get creator profile
      const creatorDoc = await transaction.get(creatorProfileRef);
      if (!creatorDoc.exists()) {
        throw new Error('Creator profile does not exist');
      }
      
      // Update video tips count
      transaction.update(videoRef, {
        tips: increment(1),
        updatedAt: serverTimestamp()
      });
      
      // Update creator V-Coins balance
      transaction.update(creatorProfileRef, {
        vCoins: increment(tipAmount),
        updatedAt: serverTimestamp()
      });
    });
    
    console.log('Tip transaction completed successfully');
  } catch (error) {
    console.error('Error processing tip:', error);
    throw error;
  }
};

/**
 * Handle video like
 */
export const likeVideo = async (db, appId, videoId) => {
  try {
    const { video } = getCollectionRefs(db, appId);
    const videoRef = video(videoId);
    
    await updateDoc(videoRef, {
      likes: increment(1),
      updatedAt: serverTimestamp()
    });
    
    console.log('Video liked successfully');
  } catch (error) {
    console.error('Error liking video:', error);
    throw error;
  }
};
