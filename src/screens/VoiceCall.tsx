import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import messaging from '@react-native-firebase/messaging';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useInitializeAgora, useRequestAudioHook } from '../components/hooks';
import { AppNavigationProps } from '../navigation/routes';

const VoiceCall = ({ navigation, route }: AppNavigationProps<'Voice'>) => {
  useRequestAudioHook();
  const {
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const offset = useSharedValue(120);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(offset.value * 1) }],
    };
  });

  useEffect(() => {
    setTimeout(() => {
      offset.value = 0;
    }, 1000);
  });

  const leave = useCallback(() => {
    leaveChannel();
    // setTimeout(() => {
    //   navigation.navigate('EndCall');
    // }, 400);
    navigation.navigate('EndCall');
  }, [leaveChannel, navigation]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification.title === 'Reject') {
        leave();
      }
    });
    return unsubscribe;
  }, [leave, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '3%',
          }}>
          <Image
            style={styles.Icon}
            source={require('../assets/apples.jpeg')}
          />
          <Image style={styles.Icon} source={require('../assets/wolf.png')} />
          <Image style={styles.Icon} source={require('../assets/fire1.jpeg')} />
          <Image style={styles.Icon} source={require('../assets/bug.jpeg')} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View>
            <Image
              style={styles.ava}
              source={require('../assets/Rosee.jpeg')}
            />
          </View>
        </View>
        <View style={styles.usersListContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.textava}> {route.params.item.name} </Text>
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
        </View>
      </View>
      <View style={styles.box2}>
        <Animated.View style={[styles.settingBox, animatedStyle]}>
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
        </Animated.View>

        <View style={styles.callBox}>
          <TouchableOpacity
            onPress={leave}
            style={[styles.call, styles.endcallbtn]}>
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
