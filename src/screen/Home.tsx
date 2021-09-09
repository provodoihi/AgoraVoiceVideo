import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppNavigationProps } from '../navigation/routes';
import styles from '../stylehome';

interface RowProp {
  item: any;
}

const Home = ({ navigation }: AppNavigationProps<'Home'>) => {
  const [data, setData] = useState([]);
  const [phoneToken, setPhoneToken] = useState('');
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const new_contact = {
    name: 'New User',
    token: phoneToken,
    status: 'Available',
  };

  const checkLaunch = useCallback(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  const getData = async () => {
    try {
      const dataList = [];
      await firestore()
        .collection('user_contact')
        .get()
        .then((doc) =>
          doc.forEach((query) => {
            const { name, token, status } = query.data();
            dataList.push({
              id: query.id,
              name: name,
              token: token,
              status: status,
            });
          }),
        );
      setData(dataList);
    } catch (error) {
      console.log(error);
    }
  };

  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
      setPhoneToken(fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  }, []);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken();
    }
  }, [getFcmToken]);

  useEffect(() => {
    requestUserPermission();
    console.log(phoneToken);
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification.title === 'Call') {
        navigation.navigate('InCall', {
          channel: remoteMessage.notification.body,
          token: remoteMessage.data.data,
        });
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    checkLaunch();
    getData();
  }, []);

  if (isFirstLaunch === null) {
    console.log('Not initialized');
  } else if (isFirstLaunch === true) {
    firestore().collection('user_contact').add(new_contact);
  } else {
    console.log('This device already launched');
  }

  const Row = ({ item }: RowProp) => {
    return (
      <TouchableOpacity
        style={styles.rectButton}
        onPress={() =>
          navigation.navigate('Detail', {
            name: item.name,
            callerToken: phoneToken,
            calleeToken: item.token,
          })
        }>
        <Text style={styles.fromText}>{item.name}</Text>
        <Text style={styles.messageText}>{item.status}</Text>
        <View style={styles.viewInfo}>
          <Text style={styles.textInfo}>i</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <Row item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Home;
