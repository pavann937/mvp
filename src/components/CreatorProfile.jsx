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
    <div className="min-h-screen bg-gradient-to-br from-dark-300 to-dark-200 pb-20">
      {/* Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-primary via-secondary to-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-4 right-4">
            <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full">
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 -mt-16">
          <div className="flex items-end space-x-4 mb-4">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center ring-4 ring-dark-300 shadow-xl">
                <span className="text-3xl font-bold text-white">
                  {userProfile?.name?.charAt(0) || 'G'}
                </span>
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-accent rounded-full shadow-lg">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setShowEditModal(true)}
              className="mb-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-xl text-primary font-medium transition-all hover:bg-primary/30"
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
          <div className="grid grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-dark-200/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/5">
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-gray-400 text-xs">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-accent" />
              Achievements
            </h3>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    achievement.earned
                      ? 'bg-accent/10 border-accent/20 text-white'
                      : 'bg-gray-800/30 border-gray-700 text-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-accent/20' : 'bg-gray-700'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-xs opacity-70">{achievement.level} Level</div>
                    </div>
                  </div>
                  {achievement.earned && (
                    <div className="text-accent text-sm font-medium">Earned</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Earnings Summary */}
          <div className="bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl p-4 border border-accent/20 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                Earnings Overview
              </h3>
              <span className="text-accent text-sm">This Month</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-white">{userProfile?.vCoins || 0}</div>
                <div className="text-gray-400 text-sm">V-Coins Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">₹2,450</div>
                <div className="text-gray-400 text-sm">Estimated Value</div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          {userProfile?.isGuru && (
            <button
              onClick={onUpload}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-6"
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
