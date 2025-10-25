// Mock global variables for development
// In production, these would be provided by the platform

window.__app_id = 'skilsnap-mvp';

// Using Firebase demo project configuration for development
window.__firebase_config = {
  apiKey: "AIzaSyDemoKeyForDevelopmentOnly123456789",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Mock auth token - in production this would be a real JWT
window.__initial_auth_token = null; // Will use anonymous auth

console.log('Mock global variables loaded for development');
