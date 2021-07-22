import React, {useEffect} from 'react';
import AppContainer from '../navigation/index';
import messaging from '@react-native-firebase/messaging';

const App = () => {

   useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage((remoteMessage) => {
      console.log(
        'Message handle in the foreground',
        remoteMessage.notification,
      );
    });
  }, []);

  return <AppContainer />;
};

export default App;
