import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox } from 'react-native'
import Navigation from '@/app/Navigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { PostsProvider } from '@/contexts/PostsContext';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <PostsProvider>
          <Navigation />
        </PostsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  )
}
