import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { NotificationProvider } from './src/services/NotificationService';

export default function App() {
  return (
    <SafeAreaProvider>
      <NotificationProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </NotificationProvider>
    </SafeAreaProvider>
  );
}
