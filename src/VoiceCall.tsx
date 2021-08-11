import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import { Stopwatch } from 'react-native-stopwatch-timer';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

import { useInitializeAgora, useRequestAudioHook } from './hooks';
import { AppNavigationProps } from './navigation/routes';
import { phonex } from './phone_token';

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

  const message = {
    message: {
      notification: {
        title: 'Phone Call',
        body: 'Someone is calling',
      },
    },
    registrationToken: token_data,
  };
  // eHwaRYrhR5ebx6Ve98x_jr:APA91bHpSsjVz5ppglLLZ11hIS3dbHrClvQhZTnnpd7RuWkcX3tKbDSLIJLXJdq51qMgpx0VQdfnQ8HTZtfz7oFi17dDKp7dgKpH0pRipg5aBZYdXc8IdeqEQetvi0tnfEDKL18cZPcI

  // const send_noti = () => {
  //   axios.post('https://fcm.googleapis.com/fcm/send', data, {
  //     headers: {
  //       Authorization:
  //         'key=AAAAQ1XvxKI:APA91bGQ91JS3ICpV3FyrwbF31RSFynHZjyAlTlf13579y83aIkod6eNxxIO7RzJgK33h63DII4G24Etnzm42MRRtCTXljX6gS9jPmSUFYcsRCe2Njwe3rlfSh71AQQ3A3fEBoOBZBHm',
  //     },
  //   });
  // };
  // // AAAAMuY7pis:APA91bEzFEh15PH73cdtnsrKdJD1w2VDheY_slLoZVF4vuyydX3PlA2TAYGYEW9ER16ygdP8kPbhwcolrtWYerY7c72qKqZHpi2_NQwF9D_66jUAb6T-u_Uhp-tWzJBP-zXKz_7G_QFB

  // API
  const handleNotification = () => {
    const url =
      'https://radiant-bastion-35631.herokuapp.com/firebase/notification';
    axios.post(url, message).catch((e) => {
      console.log('call API error', e);
    });
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
              <Text style={styles.textava}> Rosee </Text>
              <View style={styles.counterbox}>
                <Foundation name="sound" size={36} color="#90ee90" />
                <Stopwatch
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
        <View style={styles.callBox}>
          {joinSucceed === false ? (
            <TouchableOpacity
              onPress={() => handleNotification()}
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
    padding: '4%',
    borderRadius: 10,
    width: '66%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    color: '#00ff00',
    margin: '1%',
  },
};
