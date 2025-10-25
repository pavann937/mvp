import { 
  signInAnonymously, 
  signInWithCustomToken,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged
} from 'firebase/auth';

/**
 * Initialize reCAPTCHA verifier for phone authentication
 */
export const initializeRecaptcha = (auth, containerId = 'recaptcha-container') => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
};

/**
 * Send OTP to phone number
 */
export const sendOTP = async (auth, phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      phoneNumber, 
      recaptchaVerifier
    );
    console.log('OTP sent successfully');
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

/**
 * Verify OTP and sign in user
 */
export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    console.log('User signed in successfully:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

/**
 * Sign in anonymously for guest users
 */
export const signInAnonymous = async (auth) => {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log('Anonymous sign-in successful:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    throw error;
  }
};

/**
 * Sign in with custom token (for platform integration)
 */
export const signInWithToken = async (auth, customToken) => {
  try {
    const userCredential = await signInWithCustomToken(auth, customToken);
    console.log('Custom token sign-in successful:', userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error('Custom token sign-in failed:', error);
    throw error;
  }
};

/**
 * Listen to authentication state changes
 */
export const onAuthChange = (auth, callback) => {
  return onAuthStateChanged(auth, callback);
};
