import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';
//components
import CustomTextInput from '../Components/CustomTextInput/CustomTextInput';
import { FontSize } from '../Constant/FontSize';

//hooks
import useGoogleSignIn from '../Hooks/GoogleLogin/useGoogleLoginHook';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { userInfo, loading, error, signInWithGoogle } = useGoogleSignIn();


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
                    <View style={styles.card}>
                        {/* <CustomTextInput
                            label="Email"
                            style={styles.input}



                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                        <CustomTextInput
                            label="Password"
                            style={styles.input}



                            keyboardType="phone-pad"
                            maxLength={10}
                        /> */}
                    </View>

                    <Text>Sign In With Google</Text>
                    <TouchableOpacity onPress={signInWithGoogle}>
                        <Text>{loading ? 'Signing in...' : 'Google'}</Text>
                    </TouchableOpacity>

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
});

export default LoginScreen;
