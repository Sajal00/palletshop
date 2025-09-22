import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Navigator/AppNavigator';


type Props=NativeStackScreenProps<RootStackParamList,'Login'>

const LoginScreen:React.FC<Props>=()=>{

return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'pink' }}>
         <Text>Login Screen</Text>
    </View>
)

}

export default LoginScreen;