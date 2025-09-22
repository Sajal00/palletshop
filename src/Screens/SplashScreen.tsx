import React ,{ useEffect }from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View,Text} from 'react-native';
import { RootStackParamList } from '../Navigator/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


const SplashScreen: React.FC<Props> = ({ navigation }) => {


    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login'); 
        }, 2000); 
    
        return () => clearTimeout(timer); 
      }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Splash Screen</Text>
        </View>
      );
}
export default SplashScreen;