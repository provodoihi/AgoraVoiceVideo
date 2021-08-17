import React, { useCallback, useEffect } from 'react';
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
// import RNVoipCall from 'react-native-voip-call';
import { AppNavigationProps } from './navigation/routes';
import styles from './stylehome';

const Home = ({ navigation }: AppNavigationProps<'Home'>) => {
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
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log(channel);
      // // setChannel(remoteMessage.data.message);
      // // displayIncommingCall();

      // let callOptions = {
      //   callerId: remoteMessage.data.message, // Important uuid must in this format
      //   ios: {
      //     phoneNumber: '0999999999', // Caller Mobile Number
      //     name: 'Test', // caller Name
      //     hasVideo: true,
      //   },
      //   android: {
      //     ringtuneSound: false, // default true
      //     ringtune: '', // add file inside Project_folder/android/app/res/raw
      //     duration: 15000, // default 30000
      //     vibration: true, // default is true
      //     channel_name: 'Calling', //
      //     notificationId: 123,
      //     notificationTitle: 'Incoming Call',
      //     notificationBody: 'Calling from Agora',
      //     answerActionTitle: 'Answer',
      //     declineActionTitle: 'Decline',
      //     missedCallTitle: 'Call Missed',
      //     missedCallBody: 'You missed a call',
      //   },
      // };
      // RNVoipCall.displayIncomingCall(callOptions);
      // RNVoipCall.onCallAnswer(() => {
      //   navigation.navigate('InCall', { channel: remoteMessage.data.message });
      //   RNVoipCall.endAllCalls();
      // });
      navigation.navigate('InCall', { channel: remoteMessage.data.message });
    });
    return unsubscribe;
  }, [navigation, requestUserPermission]);

  return (
    <ImageBackground
      blurRadius={3}
      source={require('./assets/background.jpeg')}
      style={styles.container}>
      <View style={styles.box2}>
        <Image style={styles.call} source={require('./assets/ggvoice.png')} />
        <Text style={styles.txtBig}>Mr.T Call</Text>
      </View>
      <View style={styles.settingBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Voice')}
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
