import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  MapPin, 
  Tag, 
  Type,
  Sparkles,
  CheckCircle
} from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onUpload, userProfile }) => {
  const [uploadData, setUploadData] = useState({
    title: '',
    skillTag: userProfile?.skillTag || '',
    location: userProfile?.location || '',
    description: ''
  });
  const [step, setStep] = useState('upload'); // 'upload', 'details', 'success'
  const [loading, setLoading] = useState(false);

  const skillTags = [
    'plumbing', 'welding', 'carpentry', 'electrical', 'painting',
    'gardening', 'cooking', 'repair', 'construction', 'automotive'
  ];

  const handleUpload = async () => {
    if (!uploadData.title || !uploadData.skillTag) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await onUpload(uploadData);
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('upload');
        setUploadData({
          title: '',
          skillTag: userProfile?.skillTag || '',
          location: userProfile?.location || '',
          description: ''
        });
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-200 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl">
        
        {/* Upload Step */}
        {step === 'upload' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Create Video</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Video Upload Simulation */}
            <div className="p-6">
              <div className="relative mb-6">
                <div className="aspect-[9/16] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-white font-medium mb-2">Record Your Skill</p>
                  <p className="text-gray-400 text-sm text-center px-4">
                    Show your expertise in action
                  </p>
                </div>
                
                {/* Simulated Recording Button */}
                <button
                  onClick={() => setStep('details')}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </button>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm mb-4">
                  Tap the record button to start filming
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>• Keep it under 60s</span>
                  <span>• Show clear steps</span>
                  <span>• Good lighting</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Details Step */}
        {step === 'details' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <button
                onClick={() => setStep('upload')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-xl font-bold text-white">Add Details</h2>
              <div className="w-6"></div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <Type className="w-4 h-4 mr-2 text-primary" />
                  Video Title *
                </label>
                <input
                  type="text"
                  value={uploadData.title}
                  onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                  placeholder="e.g., How to Fix a Leaky Faucet"
                  className="w-full p-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  maxLength={50}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {uploadData.title.length}/50
                </div>
              </div>

              {/* Skill Tag */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <Tag className="w-4 h-4 mr-2 text-secondary" />
                  Skill Category *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {skillTags.slice(0, 6).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setUploadData({...uploadData, skillTag: tag})}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                        uploadData.skillTag === tag
                          ? 'border-secondary bg-secondary/20 text-white'
                          : 'border-gray-600 bg-dark-100/30 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={uploadData.skillTag}
                  onChange={(e) => setUploadData({...uploadData, skillTag: e.target.value})}
                  placeholder="Or enter custom skill"
                  className="w-full p-3 bg-dark-100/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-secondary focus:outline-none text-sm"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-accent" />
                  Location
                </label>
                <input
                  type="text"
                  value={uploadData.location}
                  onChange={(e) => setUploadData({...uploadData, location: e.target.value})}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full p-3 bg-dark-100/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-accent focus:outline-none text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  Description
                </label>
                <textarea
                  value={uploadData.description}
                  onChange={(e) => setUploadData({...uploadData, description: e.target.value})}
                  placeholder="Describe what viewers will learn..."
                  rows={3}
                  className="w-full p-3 bg-dark-100/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none text-sm resize-none"
                  maxLength={200}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {uploadData.description.length}/200
                </div>
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={loading || !uploadData.title || !uploadData.skillTag}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 inline mr-2" />
                    Publish Video
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Video Published!</h2>
            <p className="text-gray-400 mb-6">
              Your skill video is now live and ready to help others learn.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
              <p className="text-primary text-sm font-medium">
                🎉 You've earned 50 V-Coins for sharing your expertise!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
