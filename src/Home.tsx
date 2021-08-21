import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import { AppNavigationProps } from './navigation/routes';
import styles from './stylehome';

const Home = ({ navigation }: AppNavigationProps<'Home'>) => {
  const [token, setToken] = useState('');
  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      setToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    requestUserPermission();
    console.log(token);
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage.notification.title === 'Phone Call') {
        navigation.navigate('InCall', {
          channel: remoteMessage.notification.body,
          token: remoteMessage.data.data,
        });
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          if (remoteMessage.notification.title === 'Phone Call') {
            navigation.navigate('InCall', {
              channel: remoteMessage.notification.body,
              token: remoteMessage.data.data,
            });
          }
        }
      });

    messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification.title === 'Phone Call') {
        navigation.navigate('InCall', {
          channel: remoteMessage.notification.body,
          token: remoteMessage.data.data,
        });
      }
      // console.log(
      //   'Message handle in the foreground',
      //   remoteMessage.notification,
      // );
      // navigation.navigate('InCall', {
      //   channel: remoteMessage.notification.body,
      // });
    });
  }, [navigation, requestUserPermission, token]);

  return (
    <ImageBackground
      blurRadius={3}
      source={require('./assets/background2.jpg')}
      style={styles.container}>
      <View style={styles.box2}>
        <Image style={styles.call} source={require('./assets/ggvoice.png')} />
        <Text style={styles.txtBig}>Mr.T Call</Text>
      </View>
      <View style={styles.settingBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Voice', { token: token })}
          style={styles.button}>
          <Icon name="microphone" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Video')}>
          <Ionicons name="videocam" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingBox2}>
        <Text style={styles.txt}>Voice Call</Text>
        <Text style={styles.txt}>Video Call</Text>
      </View>
    </ImageBackground>
  );
};

export default Home;
