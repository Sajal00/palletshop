import React from 'react';
import AppNavigator from './src/Navigator/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
 
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
