import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store/Store'; // Adjust the path as needed

import AppNavigator from './src/Navigator/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
 
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
