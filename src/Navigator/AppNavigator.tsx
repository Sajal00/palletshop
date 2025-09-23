import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import defaultHeaderOptions from '../Constant/defaultHeaderOptions';
import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import ProductDetailsScreen from '../Screens/ProductDetailsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Product: { product: any }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) =>
          defaultHeaderOptions({
            title: 'Home',
            navigation,
            showLeftIcon: false,
            showRightIcon: false,
            rightIconName: '',
            // onRightIconPress: () => console.log('Plus icon pressed'),
          })
        } />
        <Stack.Screen name="Login" component={LoginScreen}
          options={({ navigation }) =>
            defaultHeaderOptions({
              title: 'Login',
              navigation,
              showLeftIcon: true,
              showRightIcon: false,
              leftIconName: '',

            })
          } />
        <Stack.Screen name="Product" component={ProductDetailsScreen}
          options={({ navigation }) =>
            defaultHeaderOptions({
              title: 'Details',
              navigation,
              showLeftIcon: true,
              showRightIcon: false,
              leftIconName: 'arrowleft',
              onLeftIconPress: () => {
                console.log('Back icon pressed');
                navigation.navigate('Home');
              },
            })
          } />


      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default AppNavigator;


