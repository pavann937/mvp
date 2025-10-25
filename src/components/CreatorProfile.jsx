import React, { useState } from 'react';
import { 
  Coins, 
  MapPin, 
  Award, 
  Settings, 
  Edit3, 
  Camera,
  TrendingUp,
  Users,
  Heart,
  Eye
} from 'lucide-react';

const CreatorProfile = ({ userProfile, currentUser, onUpload }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: userProfile?.name || '',
    skillTag: userProfile?.skillTag || '',
    location: userProfile?.location || ''
  });

  const stats = [
    { label: 'V-Coins', value: userProfile?.vCoins || 0, icon: Coins, color: 'text-accent' },
    { label: 'Followers', value: '1.2K', icon: Users, color: 'text-primary' },
    { label: 'Likes', value: '12.5K', icon: Heart, color: 'text-red-500' },
    { label: 'Views', value: '45.2K', icon: Eye, color: 'text-secondary' }
  ];

  const achievements = [
    { title: 'Expert Plumber', level: 'Gold', earned: true },
    { title: 'Top Creator', level: 'Silver', earned: true },
    { title: 'Community Helper', level: 'Bronze', earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      {/* Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          <div className="absolute top-4 right-4">
            <button className="p-2.5 bg-black/50 backdrop-blur-md rounded-xl border border-white/20 hover:bg-black/70 transition-all">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 -mt-16">
          <div className="flex items-end space-x-4 mb-4">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center ring-4 ring-slate-900 shadow-2xl">
                <span className="text-3xl font-bold text-white">
                  {userProfile?.name?.charAt(0) || 'G'}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full shadow-xl border-2 border-slate-900">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowEditModal(true)}
              className="mb-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-400 font-semibold transition-all hover:bg-blue-500/30 hover:border-blue-400/60"
            >
              <Edit3 className="w-4 h-4 inline mr-2" />
              Edit Profile
            </button>
          </div>

          {/* Name and Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              {userProfile?.name || 'Guru Name'}
            </h1>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>{userProfile?.skillTag || 'Skill Expert'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{userProfile?.location || 'Location'}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-black/40 backdrop-blur-xl rounded-xl p-3 text-center border border-white/10 hover:border-white/20 transition-all">
                  <Icon className={`w-5 h-5 mx-auto mb-1.5 ${stat.color}`} />
                  <div className="text-white font-bold text-base">{stat.value}</div>
                  <div className="text-gray-400 text-[10px] font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h3 className="text-white font-bold mb-3 flex items-center text-base">
              <Award className="w-5 h-5 mr-2 text-amber-400" />
              Achievements
            </h3>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 text-white hover:border-amber-400/50'
                      : 'bg-black/30 border-white/10 text-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      achievement.earned ? 'bg-amber-500/20' : 'bg-white/5'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs opacity-70">{achievement.level} Level</div>
                    </div>
                  </div>
                  {achievement.earned && (
                    <div className="text-amber-400 text-xs font-bold">Earned</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-xl p-5 border border-amber-500/30 mb-6 hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold flex items-center text-base">
                <TrendingUp className="w-5 h-5 mr-2 text-amber-400" />
                Earnings Overview
              </h3>
              <span className="text-amber-400 text-xs font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg">This Month</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-black text-white">{userProfile?.vCoins || 0}</div>
                <div className="text-gray-400 text-xs font-medium mt-1">V-Coins Earned</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-black text-white">₹2,450</div>
                <div className="text-gray-400 text-xs font-medium mt-1">Estimated Value</div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          {userProfile?.isGuru && (
            <button
              onClick={onUpload}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/50 mb-6"
            >
              <Camera className="w-5 h-5 inline mr-2" />
              Create New Video
            </button>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-200 rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h2 className="text-xl font-bold text-white mb-6">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full p-3 bg-dark-100 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Skill Tag</label>
                <input
                  type="text"
                  value={editData.skillTag}
                  onChange={(e) => setEditData({...editData, skillTag: e.target.value})}
                  className="w-full p-3 bg-dark-100 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Location</label>
                <input
                  type="text"
                  value={editData.location}
                  onChange={(e) => setEditData({...editData, location: e.target.value})}
                  className="w-full p-3 bg-dark-100 border border-gray-600 rounded-lg text-white focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: Update profile in Firestore
                  setShowEditModal(false);
                }}
                className="flex-1 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorProfile;
