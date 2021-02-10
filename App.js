import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TitleScreen from './src/pages/TitleScreen'
import Home from './src/pages/Home';
import EndGame from './src/pages/EndGame';

const Stack = createStackNavigator()

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="TitleScreen" component={TitleScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="EndGame" component={EndGame} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}