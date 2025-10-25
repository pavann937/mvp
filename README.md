# SkilSnap MVP

A short-form video platform connecting learners with vocational skill experts (Gurus). Built with React, Firebase, and Tailwind CSS.

## ✨ **Premium Features**

### 🎥 **Real Video Integration**
- **YouTube API Integration** - Real skill tutorials from YouTube
- **TikTok-style Interface** - Full-screen vertical scrolling
- **Embedded Video Player** - Native YouTube video embedding
- **Smart Categorization** - AI-powered skill detection

### 🚀 **Modern UI/UX**
- **Glassmorphism Design** - Premium glass-effect interfaces
- **Gradient Animations** - Smooth color transitions
- **Micro-interactions** - Hover effects and animations
- **Mobile-first Design** - Optimized for all devices

### 💰 **Monetization System**
- **V-Coin Tipping** - Virtual currency with real-time animations
- **Hire Me Platform** - Connect with local experts
- **Creator Earnings** - Track income and performance
- **Service Marketplace** - Book professional services

### 🔐 **Advanced Authentication**
- **Phone OTP Verification** - Secure Firebase authentication
- **Anonymous Access** - Instant guest experience
- **User Profiles** - Comprehensive creator dashboards
- **Role-based Access** - Learner vs Guru differentiation

## 🛠️ **Tech Stack**

### **Frontend**
- ⚛️ **React 18** - Latest React with hooks
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **TailwindCSS** - Utility-first styling
- 🎯 **Lucide Icons** - Beautiful icon library

### **Backend & Services**
- 🔥 **Firebase Auth** - Secure authentication
- 📊 **Firestore** - Real-time database
- 🎬 **YouTube API** - Video content integration
- 🌐 **RapidAPI** - External API management

### **Video Integration**
- 📺 **YouTube Search API** - Skill-based video discovery
- 🎯 **Smart Categorization** - Automatic skill tagging
- 🔄 **Real-time Sync** - Live video updates
- 📱 **Responsive Player** - Mobile-optimized playback

## 🚀 **Quick Start**

### **1. Installation**
```bash
# Clone the repository
git clone <repository-url>
cd skilsnap-mvp

# Install dependencies
npm install

# Start development server
npm run dev
```

### **2. Environment Setup**
Create `.env` file with your credentials:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# App Configuration
VITE_APP_ID=skilsnap-mvp
```

### **3. Firebase Setup**
1. **Create Firebase Project** at https://console.firebase.google.com
2. **Enable Authentication**:
   - Phone Authentication
   - Anonymous Authentication
3. **Setup Firestore Database**
4. **Deploy Security Rules**

### **4. API Integration**
The app uses RapidAPI for YouTube video search:
- API Key is included in the code for demo purposes
- For production, replace with your own RapidAPI key

## 📱 **App Features**

### **🏠 Home Feed**
- **Real YouTube Videos** - Skill tutorials from YouTube
- **Vertical Scrolling** - TikTok-style navigation
- **Interactive Buttons** - Like, tip, hire, share
- **Creator Profiles** - Professional creator information
- **Live Stats** - Real-time view counts and engagement

### **🔍 Discover Page**
- **Trending Skills** - Popular skill categories
- **Smart Search** - Find specific tutorials
- **Category Filters** - Browse by skill type
- **Featured Content** - Curated video collections

### **👤 Creator Profiles**
- **Earnings Dashboard** - V-Coin balance and stats
- **Achievement System** - Skill verification badges
- **Performance Metrics** - Views, likes, tips tracking
- **Professional Info** - Service areas and pricing

### **📤 Upload System**
- **Video Metadata** - Title, description, skill tags
- **Location Tagging** - Service area specification
- **Skill Categorization** - Professional classification
- **Instant Publishing** - Real-time content updates

### **💼 Hire Me Platform**
- **Service Booking** - Professional service requests
- **Contact Forms** - Direct communication with experts
- **Pricing Display** - Transparent service costs
- **Lead Management** - V-Coin based lead system

## 🎨 **Design System**

### **Color Palette**
- **Primary**: `#6366f1` (Indigo) - Main brand color
- **Secondary**: `#8b5cf6` (Purple) - Accent color
- **Accent**: `#f59e0b` (Amber) - V-Coin color
- **Dark**: `#0f172a` (Slate) - Background color

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive Scaling**: Mobile-optimized text sizes

### **Components**
- **Glassmorphism Cards** - Translucent backgrounds with blur
- **Gradient Buttons** - Multi-color interactive elements
- **Animated Icons** - Smooth hover and click effects
- **Modal Systems** - Overlay interfaces for actions

## 📊 **Data Structure**

### **Firestore Collections**
```
/artifacts/skilsnap-mvp/
├── users/{userId}/profiles/profile
│   ├── name: string
│   ├── skillTag: string
│   ├── location: string
│   ├── vCoins: number
│   └── isGuru: boolean
└── public/data/videos/{videoId}
    ├── userId: string
    ├── title: string
    ├── skillTag: string
    ├── videoUrl: string (YouTube embed)
    ├── thumbnailUrl: string
    ├── likes: number
    ├── tips: number
    └── views: number
```

### **YouTube API Integration**
```javascript
// Video data transformation
{
  id: youtube_video_id,
  title: video_title,
  skillTag: detected_skill,
  creatorName: channel_name,
  videoUrl: `https://www.youtube.com/embed/${id}`,
  thumbnailUrl: youtube_thumbnail,
  views: view_count,
  duration: formatted_duration
}
```

## 🔧 **Development**

### **Available Scripts**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### **Project Structure**
```
src/
├── components/
│   └── VideoFeed.jsx      # Main video feed component
├── firebase/
│   └── config.js          # Firebase initialization
├── App.jsx                # Main application component
├── index.css              # Tailwind CSS + custom styles
└── main.jsx               # React entry point

public/
└── mock-globals.js        # Development mock variables
```

## 🔥 Firebase Collections

```
/artifacts/{appId}/users/{userId}/profiles/profile
- name: string
- skillTag: string  
- location: string
- vCoins: number
- isGuru: boolean

/artifacts/{appId}/public/data/videos/{videoId}
- userId: string (creator ID)
- title: string
- skillTag: string
- videoUrl: string
- likes: number
- tips: number
```

## 🎯 Development Phases

1. **Phase 1**: Firebase setup and authentication ✅
2. **Phase 2**: Core video feed UI with mock data ✅
3. **Phase 3**: Creator profile and upload simulation
4. **Phase 4**: V-Coin tipping and hire functionality

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

- **Primary Color**: `#6366f1` (Indigo)
- **Secondary Color**: `#8b5cf6` (Purple) 
- **Accent Color**: `#f59e0b` (Amber)
- **Background**: `#0f172a` (Dark slate)
- **Font**: Inter (Google Fonts)

## 📝 Notes

- CSS warnings about `@tailwind` directives are expected and will resolve during build
- Mock globals are loaded automatically in development
- All interactions currently log to console for debugging
