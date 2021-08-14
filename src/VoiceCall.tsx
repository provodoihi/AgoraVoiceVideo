import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from './hooks';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AppNavigationProps } from './navigation/routes';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useState } from 'react';
import { phonex } from './phone_token';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const VoiceCall = ({ navigation }: AppNavigationProps<'Voice'>) => {
  useRequestAudioHook();
  const {
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const [token_data, setToken] = useState('');

  const data = {
    message: 'hello',
    token: token_data,
  };

  const send_noti = async () => {
    try {
      await axios.post('http://192.168.1.7:8080/api', data);
    } catch (error) {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
  };

  const leave = () => {
    leaveChannel();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 500);
  };

  return (
    <ImageBackground
      style={styles.container}
      source={
        joinSucceed
          ? require('./assets/Empty-Background-01.png')
          : require('./assets/bg.jpg')
      }>
      <View style={styles.box1}>
        {joinSucceed ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '2.5%',
            }}>
            <Image
              style={styles.Icon}
              source={require('./assets/apples.jpeg')}
            />
            <Image style={styles.Icon} source={require('./assets/wolf.png')} />
            <Image
              style={styles.Icon}
              source={require('./assets/fire1.jpeg')}
            />
            <Image style={styles.Icon} source={require('./assets/bug.jpeg')} />
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.text}> Calling</Text>
            <Picker
              selectedValue={token_data}
              onValueChange={(value) => setToken(value)}
              style={styles.pick}
              dropdownIconColor="#ffffff">
              <Picker.Item label="Choose User To Call" value="" />
              {phonex.map((item) => {
                return (
                  <Picker.Item
                    key={item.id}
                    label={item.phone}
                    value={item.token}
                  />
                );
              })}
            </Picker>
          </View>
        )}

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {joinSucceed ? (
            <View>
              <Image
                style={styles.ava}
                source={require('./assets/Rosee.jpeg')}
              />
            </View>
          ) : (
            <Icons name="phone" size={96} color="#fff" />
          )}
        </View>
        <View style={styles.usersListContainer}>
          {Object.keys(peerIds).length === 0 ? (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>
                You are not calling anyone
              </Text>
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.textava}> Rosé </Text>
              {Object.keys(peerIds).length === 2 ? (
                <View style={styles.counterbox}>
                  <Foundation name="sound" size={28} color="#90ee90" />
                  <Stopwatch
                    start={isStopwatchStart}
                    //To start
                    reset={resetStopwatch}
                    //To reset
                    options={options}
                    //options for the styling
                  />
                </View>
              ) : (
                <View style={styles.counterbox}>
                  <SimpleLineIcons name="call-out" size={42} color="#00FF00" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.box2}>
        {joinSucceed ? (
          <View style={styles.settingBox}>
            <TouchableOpacity onPress={toggleIsMute} style={styles.button}>
              {isMute ? (
                <Icon name="microphone-slash" size={28} color="#fff" />
              ) : (
                <Icon name="microphone" size={28} color="#fff" />
              )}
            </TouchableOpacity>
            <View style={styles.floatRight}>
              <TouchableOpacity style={styles.button} onPress={leave}>
                <Ionicons name="home" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleIsSpeakerEnable}
              style={[styles.button]}>
              <Icon
                name="volume-up"
                size={28}
                color={isSpeakerEnable ? '#ffffff' : '#000000'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.box2}>
            <TouchableOpacity
              style={styles.homebtn}
              onPress={() => navigation.navigate('Home')}>
              <Ionicons name="home" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.callBox}>
          {joinSucceed === false ? (
            <TouchableOpacity
              onPress={() => send_noti()}
              onPressIn={joinChannel}
              style={styles.call}>
              <Image
                source={require('./assets/accept-call.png')}
                resizeMode="contain"
                style={styles.call}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={leaveChannel}
              style={[styles.call, styles.endcallbtn]}>
              <Image
                source={require('./assets/end-call.png')}
                resizeMode="contain"
                style={styles.call}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};
export default VoiceCall;

const options = {
  container: {
    // backgroundColor: '#ffffff',
    padding: '4%',
    borderRadius: 10,
    width: '66%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: '#00ff00',
    margin: '1%',
  },
};
