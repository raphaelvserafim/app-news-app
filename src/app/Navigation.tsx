import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/model';
import { HomeScreen } from '@/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#fff" animated={true} />
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}

