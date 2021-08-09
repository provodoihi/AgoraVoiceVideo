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

  // const phonex = require('./phone_token.json');

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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.Icon}
              source={require('./assets/apples.jpeg')}
            />
            <Image style={styles.Icon} source={require('./assets/wolf.png')} />
            <Image
              style={styles.Icon}
              source={require('./assets/fire1.jpeg')}
            />
            <Image style={styles.Icon1} source={require('./assets/bug.jpeg')} />
          </View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.text}> Calling</Text>
            <Picker
              selectedValue={token_data}
              onValueChange={(value) => setToken(value)}
              style={styles.pick}
              dropdownIconColor="#9FA5AA">
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
            <Icons name="phone" size={90} color="#fff" />
          )}
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {joinSucceed ? (
            <View>
              <Image
                style={styles.ava}
                source={require('./assets/Rosee.jpeg')}
              />
            </View>
          ) : (
            <Icons name="phone" size={90} color="#fff" />
          )}
        </View>
        <View style={styles.usersListContainer}>
          {Object.keys(peerIds).length == 0 ? (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={{ color: '#fff', fontSize: 15 }}>
                You are not calling anyone
              </Text>
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#000',
                  marginTop: 0,
                  fontWeight: 'bold',
                }}>
                {' '}
                Rosee{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <Foundation
                  style={{
                    marginTop: 18,
                    marginRight: -50,
                    marginLeft: 60,
                  }}
                  name="sound"
                  size={40}
                  color="#90ee90"
                />
                <Stopwatch
                  style={{ marginLeft: 0 }}
                  start={isStopwatchStart}
                  //To start
                  reset={resetStopwatch}
                  //To reset
                  options={options}
                  //options for the styling
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.box2}>
        <View style={styles.settingBox}>
          <TouchableOpacity onPress={toggleIsMute} style={styles.button}>
            {isMute ? (
              <Icon name="microphone-slash" size={35} color="#fff" />
            ) : (
              <Icon name="microphone" size={35} color="#fff" />
            )}
          </TouchableOpacity>
          <View style={styles.floatRight}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Ionicons name="home" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={toggleIsSpeakerEnable}
            style={[styles.button]}>
            <Icon
              name="volume-up"
              size={32}
              color={isSpeakerEnable ? '#000000' : '#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
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
            <TouchableOpacity onPress={leaveChannel} style={styles.call}>
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
    padding: 10,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    color: '#00ff00',
    margin: 10,
  },
};
