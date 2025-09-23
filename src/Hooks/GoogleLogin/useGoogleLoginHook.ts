import { useState } from 'react';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../Redux/Slice/userSlice'; // Redux action creator

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  offlineAccess: true,
});

export default function useGoogleSignIn() {
  
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const dispatch = useDispatch(); 

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResponse = await GoogleSignin.signIn();
      
      
      dispatch(setUserInfo(signInResponse?.data?.user));
      
      console.log('User signed in successfully and stored in Redux:', signInResponse?.data?.user); 
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);

      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('You cancelled the sign-in process.');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        setError('Sign-in is already in progress. Please wait.');
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services not available or outdated.');
      } else if (err.code === statusCodes.SIGN_IN_REQUIRED) {
        setError('Please select a Google account to sign in.');
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      // 3. Dispatch the Redux action to clear user info
      dispatch(setUserInfo(null));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 4. Return only the state and functions that are still relevant
  return { loading, error, signInWithGoogle, signOutFromGoogle };
}