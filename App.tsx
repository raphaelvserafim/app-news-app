import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'
import Navigation from '@/app/Navigation';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}
