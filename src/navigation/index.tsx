import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceCall from '../VoiceCall';
import InCall from '../IncomingCall';
import VideoCall from '../VideoCall';
import { AppRoutes } from './routes';
import Home from '../Home';

const Stack = createStackNavigator<AppRoutes>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Voice"
          component={VoiceCall}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Video"
          component={VideoCall}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InCall"
          component={InCall}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
