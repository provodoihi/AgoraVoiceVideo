import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceCall from '../screens/VoiceCall';
import VideoCall from '../screens/VideoCall';
import InCall from '../screens/IncomingCall';
import { AppRoutes } from './routes';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import EndCall from '../screens/EndCall';

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
        <Stack.Screen
          options={{ headerShown: true }}
          name="Detail"
          component={Detail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EndCall"
          component={EndCall}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
