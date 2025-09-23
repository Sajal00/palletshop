import React ,{ useEffect }from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {View,Text} from 'react-native';
import { RootStackParamList } from '../Navigator/AppNavigator';
//redux
import { useSelector } from 'react-redux';
import colors from '../Constant/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;


const SplashScreen: React.FC<Props> = ({ navigation }) => {
  
  

    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login'); 
        }, 2000); 
    
        return () => clearTimeout(timer); 
      }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.primary}}>
          <Text style={{ color: '#fff' }}> Welcome to PalletShop</Text>
        </View>
      );
}
export default SplashScreen;