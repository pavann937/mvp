import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

/**
 * Firebase configuration - supports both platform globals and environment variables
 */
const getFirebaseConfig = () => {
  // First try platform-provided global variables
  if (window.__firebase_config) {
    return {
      config: window.__firebase_config,
      appId: window.__app_id || 'skilsnap-mvp'
    };
  }
  
  // Fallback to environment variables
  return {
    config: {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    },
    appId: import.meta.env.VITE_APP_ID || 'skilsnap-mvp'
  };
};

/**
 * Initialize Firebase services
 */
export const initializeFirebase = () => {
  try {
    console.log('🔧 Getting Firebase configuration...');
    const { config, appId } = getFirebaseConfig();
    
    console.log('📋 Firebase config:', {
      apiKey: config.apiKey ? '✅ Present' : '❌ Missing',
      projectId: config.projectId || '❌ Missing',
      authDomain: config.authDomain ? '✅ Present' : '❌ Missing'
    });
    
    // Validate configuration
    if (!config.apiKey || !config.projectId) {
      throw new Error(`Firebase configuration is incomplete. Missing: ${!config.apiKey ? 'API Key ' : ''}${!config.projectId ? 'Project ID' : ''}`);
    }

    console.log('🚀 Initializing Firebase app...');
    // Initialize Firebase app
    const app = initializeApp(config);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Connect to emulators in development (optional)
    if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
      try {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
        connectFirestoreEmulator(db, 'localhost', 8080);
        console.log('🔧 Connected to Firebase emulators');
      } catch (error) {
        console.warn('⚠️ Failed to connect to emulators:', error);
      }
    }

    console.log('✅ Firebase initialized successfully');
    console.log('📊 Project ID:', config.projectId);
    console.log('🆔 App ID:', appId);

    return { 
      auth, 
      db, 
      appId,
      config
    };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    console.error('🔍 Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw error;
  }
};

/**
 * Get Firestore collection paths using the app structure
 */
export const getCollectionPaths = (appId) => ({
  // User profiles (private)
  userProfiles: (userId) => `artifacts/${appId}/users/${userId}/profiles`,
  
  // Public videos collection
  videos: `artifacts/${appId}/public/data/videos`,
  
  // Public data collection
  publicData: `artifacts/${appId}/public/data`
});
