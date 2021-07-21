import React, { useCallback, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
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
      console.log('Authorization status:', authStatus);
    }
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(() => {
      Alert.alert('React Native Call', 'You got a call');
    });
    return unsubscribe;
  }, [requestUserPermission]);

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
