import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Coins,
  Star,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

const HireMeModal = ({ isOpen, onClose, creatorData, userProfile }) => {
  const [step, setStep] = useState('details'); // 'details', 'contact', 'success'
  const [contactInfo, setContactInfo] = useState({
    name: userProfile?.name || '',
    phone: '',
    message: '',
    urgency: 'normal'
  });
  const [loading, setLoading] = useState(false);

  const handleHireRequest = async () => {
    if (!contactInfo.name || !contactInfo.phone) {
      alert('Please fill in your contact details');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('success');
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setStep('details');
        setContactInfo({
          name: userProfile?.name || '',
          phone: '',
          message: '',
          urgency: 'normal'
        });
      }, 3000);
    } catch (error) {
      console.error('Hire request error:', error);
      alert('Failed to send hire request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !creatorData) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-200 rounded-3xl w-full max-w-md border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Creator Details Step */}
        {step === 'details' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Hire Expert</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Creator Profile */}
            <div className="p-6">
              {/* Creator Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {creatorData.creatorName?.charAt(0) || 'G'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{creatorData.creatorName}</h3>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <Award className="w-4 h-4" />
                    <span>{creatorData.skillTag} Expert</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1">4.9 (127 reviews)</span>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-dark-100/50 rounded-xl p-4 mb-6 border border-white/5">
                <h4 className="text-white font-semibold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-accent" />
                  Service Area
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Available in Mumbai and surrounding areas (15km radius)
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Experience</div>
                    <div className="text-white font-medium">8+ Years</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Response Time</div>
                    <div className="text-white font-medium">Within 2 hours</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Starting Price</div>
                    <div className="text-white font-medium">₹500/hour</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Availability</div>
                    <div className="text-green-400 font-medium">Available Now</div>
                  </div>
                </div>
              </div>

              {/* V-Coin Cost */}
              <div className="bg-gradient-to-r from-accent/10 to-yellow-500/10 rounded-xl p-4 border border-accent/20 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold flex items-center">
                      <Coins className="w-4 h-4 mr-2 text-accent" />
                      Lead Cost
                    </h4>
                    <p className="text-gray-400 text-sm">
                      50 V-Coins will be transferred to the expert when they accept your request
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">50</div>
                    <div className="text-xs text-gray-400">V-Coins</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setStep('contact')}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Continue to Contact Details
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full bg-dark-100/50 hover:bg-dark-100 text-gray-300 hover:text-white font-medium py-3 rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {/* Contact Information Step */}
        {step === 'contact' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <button
                onClick={() => setStep('details')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back
              </button>
              <h2 className="text-xl font-bold text-white">Contact Details</h2>
              <div className="w-6"></div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <User className="w-4 h-4 mr-2 text-primary" />
                  Your Name *
                </label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="w-full p-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <Phone className="w-4 h-4 mr-2 text-secondary" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                  className="w-full p-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <Clock className="w-4 h-4 mr-2 text-accent" />
                  When do you need this service?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'urgent', label: 'ASAP', color: 'red' },
                    { id: 'normal', label: 'This Week', color: 'blue' },
                    { id: 'flexible', label: 'Flexible', color: 'green' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setContactInfo({...contactInfo, urgency: option.id})}
                      className={`p-3 rounded-lg border transition-all text-sm font-medium ${
                        contactInfo.urgency === option.id
                          ? `border-${option.color}-500 bg-${option.color}-500/20 text-white`
                          : 'border-gray-600 bg-dark-100/30 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center text-white text-sm font-medium mb-3">
                  <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                  Describe Your Requirement
                </label>
                <textarea
                  value={contactInfo.message}
                  onChange={(e) => setContactInfo({...contactInfo, message: e.target.value})}
                  placeholder="Describe what you need help with, location details, etc."
                  rows={4}
                  className="w-full p-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleHireRequest}
                disabled={loading || !contactInfo.name || !contactInfo.phone}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Request...</span>
                  </div>
                ) : (
                  <>
                    <Phone className="w-5 h-5 inline mr-2" />
                    Send Hire Request
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
            <h2 className="text-2xl font-bold text-white mb-2">Request Sent!</h2>
            <p className="text-gray-400 mb-6">
              {creatorData.creatorName} will contact you within 2 hours to discuss your requirements.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
              <p className="text-primary text-sm font-medium">
                📱 You'll receive an SMS confirmation shortly
              </p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
              <p className="text-accent text-sm font-medium">
                💰 50 V-Coins will be transferred when the expert accepts
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HireMeModal;
