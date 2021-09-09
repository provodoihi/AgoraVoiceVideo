import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppNavigationProps } from '../navigation/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EndCall = ({ navigation }: AppNavigationProps<'EndCall'>) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.iconBox}>
          <Image
            style={styles.Icon}
            source={require('../assets/apples.jpeg')}
          />
          <Image style={styles.Icon} source={require('../assets/wolf.png')} />
          <Image style={styles.Icon} source={require('../assets/fire1.jpeg')} />
          <Image style={styles.Icon} source={require('../assets/bug.jpeg')} />
        </View>

        <View style={{ flex: 2, justifyContent: 'flex-end' }}>
          <View>
            <Image
              style={styles.ava}
              source={require('../assets/Rosee.jpeg')}
            />
          </View>
        </View>
        <View style={styles.usersListContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textava}> Rosé </Text>
            <View style={styles.counterbox}>
              <Text style={styles.textend}>Call Ended</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.settingBox}>
          <TouchableOpacity style={styles.button}>
            <Icon name="microphone" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.floatRight}>
            <TouchableOpacity style={styles.button}>
              <Ionicons name="home" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button]}>
            <Icon name="volume-up" size={28} color={'#fff'} />
          </TouchableOpacity>
        </View>

        <View style={styles.callBox}>
          <TouchableOpacity style={[styles.call, styles.endcallbtn]}>
            <Image
              source={require('../assets/end-call.png')}
              resizeMode="contain"
              style={styles.call}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default EndCall;
