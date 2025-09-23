import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { selectUserInfo } from '../Redux/Selector/Selectors';
import { useNavigation } from '@react-navigation/native';


//hooks
import useGoogleSignIn from '../Hooks/GoogleLogin/useGoogleLoginHook';
import { useSelector } from 'react-redux';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {

    const navigation = useNavigation();
    const { loading, error, signInWithGoogle } = useGoogleSignIn();

    const user = useSelector(selectUserInfo);
    console.log("user", user);

    useEffect(() => {
        // only run if user has data
        if (user && Object.keys(user).length > 0) {
          const timer = setTimeout(() => {
            navigation.navigate('Home');
          }, 2000);
      
          return () => clearTimeout(timer); // cleanup
        }
      }, [user, navigation]);

    return (


        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>

                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signInWithGoogle}
                        disabled={loading}
                    />


                    {user ? (
                        <View style={styles.profileContainer}>
                            <Text style={styles.loggedInText}>Logged In:</Text>
                            <Text style={styles.userName}>{user.name}</Text>
                            {/* Conditionally render the image if photo URL exists */}
                            {user.photo && (
                                <Image
                                    source={{ uri: user.photo }}
                                    style={styles.profileImage}
                                />
                            )}
                        </View>
                    ) : (
                        <Text style={styles.notLoggedInText}>Not Logged In</Text>
                    )}

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 3,
        gap: 10
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    loggedInText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        marginTop: 5,
    },
    notLoggedInText: {
        fontSize: 16,
        marginTop: 20,
        color: 'gray',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
    },

});

export default LoginScreen;