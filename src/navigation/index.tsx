import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceCall from '../VoiceCall';
import InCall from '../IncomingCall';
import VideoCall from '../VideoCall';
import { AppRoutes } from './routes';
import Home from '../Home';
import MyContacts from '../MyContact';
import CreateContact from '../CreateContact';
import Profile from '../Profile';

const Stack = createStackNavigator<AppRoutes>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MyContacts">
        <Stack.Screen name="MyContacts" component={MyContacts} />
        <Stack.Screen name="CreateContact" component={CreateContact} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
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
