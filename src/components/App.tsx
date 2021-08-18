import React, { useEffect } from 'react';
import AppContainer from '../navigation/index';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });

  return <AppContainer />;
};

export default App;
