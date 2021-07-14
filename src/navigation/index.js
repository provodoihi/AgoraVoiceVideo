import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceCall from '../VoiceCall';
import VideoCall from '../VideoCall';

const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VoiceCall">
        <Stack.Screen
          options={{ headerShown: false }}
          name="VoiceCall"
          component={VoiceCall}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VideoCall"
          component={VideoCall}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
