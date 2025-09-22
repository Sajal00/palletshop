import { useState } from 'react';
import { GoogleSignin, SignInResponse, statusCodes, User } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env'; // from your .env

// Initialize Google Signin configuration
GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true, // if you want server auth code
});

interface UseGoogleSignInReturn {
    userInfo: User | null;
    loading: boolean;
    error: string | null;
    signInWithGoogle: () => Promise<void>;
    signOutFromGoogle: () => Promise<void>;
}

const useGoogleSignIn = (): UseGoogleSignInReturn => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signInWithGoogle = async () => {

        setLoading(true);
        setError(null);
        try {

            await GoogleSignin.hasPlayServices();
            const user: SignInResponse = await GoogleSignin.signIn();
            console.log("user",user);
            
            // setUserInfo(user);

        } catch (err: any) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                setError('User cancelled the login flow');
            } else if (err.code === statusCodes.IN_PROGRESS) {
                setError('Sign in is in progress');
            } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setError('Google Play Services not available or outdated');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const signOutFromGoogle = async () => {
        try {
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { userInfo, loading, error, signInWithGoogle, signOutFromGoogle };
};

export default useGoogleSignIn;
