import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { useInitializeAgora } from '../components/hooks';
import { AppNavigationProps } from '../navigation/routes';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Detail = ({ navigation, route }: AppNavigationProps<'Detail'>) => {
  const { channelName, joinChannel } = useInitializeAgora();

  const handleNotification = () => {
    const url =
      'https://radiant-bastion-35631.herokuapp.com/firebase/notification';
    axios
      .post(url, route.params.message)
      .then(() => {
        joinChannel();
        navigation.navigate('Voice');
      })
      .catch((e) => {
        console.log('call API error', e);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.text}>{route.params.item.name}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.phone}>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: '2%',
              fontSize: 18,
              flex: 2,
            }}>
            {route.params.item.phone}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity onPress={handleNotification}>
              <Icon name="phone" size={36} color="green" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Video')}>
              <Ionicons name="videocam" size={36} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: w,
    height: h / 3,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  phone: {
    flexDirection: 'row',
    marginTop: '2%',
    width: '95%',
    height: h / 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default Detail;
