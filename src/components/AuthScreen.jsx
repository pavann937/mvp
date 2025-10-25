import React, { useState } from 'react';
import { Phone, User, Shield, Sparkles, Zap, Users, Award } from 'lucide-react';
import { initializeRecaptcha, sendOTP, verifyOTP, signInAnonymous } from '../firebase/auth';

const AuthScreen = ({ auth, onAuthSuccess }) => {
  const [step, setStep] = useState('welcome'); // 'welcome', 'phone', 'otp', 'profile'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isGuru, setIsGuru] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle phone number submission
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Initialize reCAPTCHA
      const recaptchaVerifier = initializeRecaptcha(auth);
      
      // Send OTP
      const confirmation = await sendOTP(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setStep('otp');
    } catch (error) {
      setError(error.message);
      console.error('Phone auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await verifyOTP(confirmationResult, otp);
      setStep('profile');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle profile completion
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess({ isGuru });
  };

  // Handle anonymous sign-in
  const handleAnonymousSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      await signInAnonymous(auth);
      onAuthSuccess({ isGuru: false });
    } catch (error) {
      setError('Failed to sign in anonymously');
      console.error('Anonymous auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Welcome Screen */}
        {step === 'welcome' && (
          <div className="bg-black/40 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/50">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-2">
                SkilSnap
              </h1>
              <p className="text-gray-300 text-lg font-medium">Learn Skills, Hire Experts</p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-white text-sm font-medium">Quick skill tutorials</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-xl border border-teal-500/30 hover:border-teal-400/50 transition-all">
                <div className="p-2 bg-teal-500/20 rounded-lg">
                  <Users className="w-5 h-5 text-teal-400" />
                </div>
                <span className="text-white text-sm font-medium">Connect with local experts</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30 hover:border-amber-400/50 transition-all">
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-white text-sm font-medium">Earn V-Coins for expertise</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => setStep('phone')}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/50"
              >
                Get Started with Phone
              </button>

              <button
                onClick={handleAnonymousSignIn}
                disabled={loading}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-semibold py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Continue as Guest'}
              </button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6 font-medium">
              By continuing, you agree to our Terms of Service
            </p>
          </div>
        )}

        {/* Phone Number Step */}
        {step === 'phone' && (
          <div className="bg-dark-200/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Enter Phone Number</h2>
              <p className="text-gray-400">We'll send you a verification code</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-12 pr-4 py-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  'Send Verification Code'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="w-full text-gray-400 hover:text-white text-sm transition-colors"
              >
                ← Back to Welcome
              </button>
            </form>
          </div>
        )}

        {/* OTP Verification Step */}
        {step === 'otp' && (
          <div className="bg-dark-200/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Verify Code</h2>
              <p className="text-gray-400">Enter the 6-digit code sent to</p>
              <p className="text-primary font-medium">{phoneNumber}</p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  maxLength="6"
                  className="w-full py-4 bg-dark-100/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-center text-3xl tracking-[0.5em] font-mono transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Verify Code'
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-gray-400 hover:text-white text-sm transition-colors"
              >
                ← Back to Phone Number
              </button>
            </form>
          </div>
        )}

        {/* Profile Setup Step */}
        {step === 'profile' && (
          <div className="bg-dark-200/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to SkilSnap!</h2>
              <p className="text-gray-400">Choose your role to get started</p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setIsGuru(false)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    !isGuru 
                      ? 'border-primary bg-gradient-to-r from-primary/20 to-secondary/20 text-white shadow-lg' 
                      : 'border-gray-600 bg-dark-100/50 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      !isGuru ? 'bg-primary/30' : 'bg-gray-600/30'
                    }`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-lg">I'm a Learner</h3>
                      <p className="text-sm opacity-80">I want to learn new skills and hire experts</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setIsGuru(true)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    isGuru 
                      ? 'border-secondary bg-gradient-to-r from-secondary/20 to-accent/20 text-white shadow-lg' 
                      : 'border-gray-600 bg-dark-100/50 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isGuru ? 'bg-secondary/30' : 'bg-gray-600/30'
                    }`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="font-semibold text-lg">I'm a Guru</h3>
                      <p className="text-sm opacity-80">I want to share my skills and earn V-Coins</p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent to-yellow-500 hover:from-accent/80 hover:to-yellow-500/80 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start My SkilSnap Journey
              </button>
            </form>
          </div>
        )}

        {/* reCAPTCHA container */}
        <div id="recaptcha-container" className="mt-4"></div>
      </div>
    </div>
  );
};

export default AuthScreen;
