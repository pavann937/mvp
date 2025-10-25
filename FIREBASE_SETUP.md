# Firebase Setup Guide for SkilSnap MVP

## 🔥 Complete Firebase Implementation Steps

### Step 1: Firebase Console Configuration

#### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Project name: `skilsnap-mvp`
4. Enable Google Analytics (recommended)
5. Click **"Create project"**

#### 1.2 Add Web App
1. Click the **Web icon** (`</>`) in project overview
2. App nickname: `SkilSnap MVP`
3. Enable Firebase Hosting (optional)
4. **Copy the configuration object** - you'll need this!

### Step 2: Authentication Setup

#### 2.1 Enable Sign-in Methods
1. Go to **Authentication** → **Sign-in method**
2. Enable:
   - **Anonymous** (for guest users)
   - **Phone** (for OTP authentication)
   - **Email/Password** (backup method)

#### 2.2 Phone Authentication Configuration
1. In Phone provider settings:
   - Enable phone sign-in
   - Add authorized domains: `localhost`, your production domain
   - Configure reCAPTCHA settings

### Step 3: Firestore Database Setup

#### 3.1 Create Database
1. Go to **Firestore Database**
2. Click **"Create database"**
3. Start in **test mode** (temporarily)
4. Choose location closest to users
5. Click **"Done"**

#### 3.2 Deploy Security Rules
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### Step 4: Environment Configuration

#### 4.1 Update .env File
Replace the values in `.env` with your Firebase project configuration:

```env
# Get these values from Firebase Console → Project Settings → General → Your apps
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_APP_ID=skilsnap-mvp
```

#### 4.2 Platform Integration (Production)
For platform deployment, ensure these global variables are set:
```javascript
window.__app_id = 'skilsnap-mvp';
window.__firebase_config = {
  // Your Firebase configuration object
};
window.__initial_auth_token = 'optional_custom_token';
```

### Step 5: Testing the Setup

#### 5.1 Start Development Server
```bash
npm run dev
```

#### 5.2 Test Authentication Flow
1. Open `http://localhost:5173`
2. Try phone authentication (use test phone numbers in development)
3. Test anonymous sign-in
4. Verify user profile creation in Firestore

#### 5.3 Test Real-time Features
1. Open multiple browser tabs
2. Like/tip videos in one tab
3. Verify real-time updates in other tabs

### Step 6: Data Structure Verification

#### 6.1 Firestore Collections
Verify these collections are created:
```
/artifacts/skilsnap-mvp/users/{userId}/profiles/profile
/artifacts/skilsnap-mvp/public/data/videos/{videoId}
```

#### 6.2 Sample Data Creation
Use Firebase Console to add sample videos:
```json
{
  "userId": "sample_guru_id",
  "title": "Basic Plumbing Repair",
  "skillTag": "plumbing",
  "videoUrl": "",
  "likes": 0,
  "tips": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Step 7: Security and Performance

#### 7.1 Security Rules Verification
Test security rules in Firebase Console:
- Users can only access their own profiles
- Anyone can read public videos
- Only authenticated users can create videos

#### 7.2 Performance Optimization
1. Enable Firestore indexes for queries
2. Set up Firebase Performance Monitoring
3. Configure Analytics events

### Step 8: Production Deployment

#### 8.1 Build for Production
```bash
npm run build
```

#### 8.2 Deploy to Firebase Hosting (Optional)
```bash
firebase init hosting
firebase deploy --only hosting
```

#### 8.3 Environment Variables for Production
Ensure production environment has:
- Correct Firebase configuration
- Proper domain authorization
- Security rules deployed

## 🚨 Important Notes

### Development vs Production
- **Development**: Uses `.env` file for configuration
- **Production**: Uses global variables from platform

### Security Considerations
- Never commit real Firebase keys to version control
- Use different Firebase projects for dev/staging/production
- Regularly review and update security rules

### Testing Phone Authentication
- Use Firebase test phone numbers during development
- Configure reCAPTCHA for production
- Test with real phone numbers before production deployment

### Troubleshooting Common Issues

#### Firebase Configuration Errors
- Verify API key format and validity
- Check project ID matches exactly
- Ensure all required fields are present

#### Authentication Issues
- Verify authorized domains in Firebase Console
- Check reCAPTCHA configuration
- Test with different browsers/devices

#### Firestore Permission Errors
- Verify security rules are deployed
- Check user authentication status
- Validate document paths match rules

## 📞 Support
For Firebase-specific issues, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase Support](https://firebase.google.com/support)
