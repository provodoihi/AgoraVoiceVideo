import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

import { useInitializeAgora } from '../hooks';
import IpSwipe from '../components/IpSwipe';
import { AppNavigationProps } from '../navigation/routes';
import styles from '../stylehome';

interface SwipeableProps {
  item: any;
  index: any;
}

interface RowProp {
  item: any;
}

const Home = ({ navigation }: AppNavigationProps<'Home'>) => {
  const { channelName, joinChannel } = useInitializeAgora();
  const [token, setToken] = useState('');
  const [contact, setContact] = useState(null);

  const fetchContact = async () => {
    try {
      const list = [];
      await firestore()
        .collection('Contact')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { name, token, phone } = doc.data();
            list.push({
              id: doc.id,
              name: name,
              token: token,
              phone: phone,
            });
          });
        });
      setContact(list);
    } catch (e) {
      console.log('Fetch contact failed', e);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

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

  const Row = ({ item }: RowProp) => {
    const message = {
      message: {
        notification: {
          title: 'Phone Call',
          body: channelName,
        },
        data: {
          data: token,
        },
      },
      registrationToken: item.token,
    };

    // API
    const handleNotification = () => {
      const url =
        'https://radiant-bastion-35631.herokuapp.com/firebase/notification';
      axios
        .post(url, message)
        .then(() => {
          joinChannel();
          navigation.navigate('Voice');
        })
        .catch((e) => {
          console.log('call API error', e);
        });
    };
    return (
      <TouchableOpacity
        style={styles.rectButton}
        onPress={() => handleNotification()}>
        <Text style={styles.fromText}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.messageText}>
          {item.phone}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Detail', {item: item})} style={styles.viewInfo}>
          <Text style={styles.textInfo}>i</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const SwipeableRow = ({ item, index }: SwipeableProps) => {
    return (
      <IpSwipe>
        <Row item={item} />
      </IpSwipe>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.buttonBox}>
          <Icon name="plus" size={28} color="blue" />
          <Text style={styles.text}>Edit</Text>
        </View>
        <Text style={styles.headerText}>Contact List</Text>
      </View>
      <FlatList
        data={contact}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <SwipeableRow item={item} index={index} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
    </View>
  );
};

export default Home;
