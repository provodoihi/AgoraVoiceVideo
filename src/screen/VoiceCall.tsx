import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from '../components/hooks';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AppNavigationProps } from '../navigation/routes';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useState } from 'react';
import { phonex } from '../components/phone_token';
import Foundation from 'react-native-vector-icons/Foundation';
import messaging from '@react-native-firebase/messaging';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { responsiveHeight as rh } from 'react-native-responsive-dimensions';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const VoiceCall = ({ navigation, route }: AppNavigationProps<'Voice'>) => {
  useRequestAudioHook();
  const {
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    joinChannel,
    channelName,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const [token_data, setToken] = useState('');

  const data = {
    title: 'Call',
    body: channelName,
    data: route.params.token,
    token: token_data,
  };

  const send_noti = async () => {
    try {
      await axios.post('http://192.168.1.7:8080/api/notify', data);
    } catch (error) {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
  };

  const leave = useCallback(() => {
    leaveChannel();
    navigation.navigate('EndCall');
  }, [leaveChannel, navigation]);

  const join = () => {
    joinChannel();
    offset.value = 0;
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification.title === 'Reject') {
        leave();
      }
    });
    return unsubscribe;
  }, [leave, navigation]);

  const pressed = useSharedValue(false);
  const pressed2 = useSharedValue(false);
  const offset = useSharedValue(rh(16));
  const eventHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        pressed.value = true;
      },
      onEnd: () => {
        pressed.value = false;
      },
    },
  );
  const eventHandler2 = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        pressed2.value = true;
      },
      onEnd: () => {
        pressed2.value = false;
      },
    },
  );
  const ani_style = useAnimatedStyle(() => {
    return {
      borderColor: pressed.value ? '#ffffff' : '#ffffff',
      borderWidth: pressed.value ? 1 : 0,
      transform: [{ scale: withSpring(pressed.value ? 0.6 : 1) }],
    };
  });

  const ani_box = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withDelay(1200, withSpring(offset.value)) }],
    };
  });

  return (
    <ImageBackground
      style={styles.container}
      source={
        joinSucceed
          ? require('../assets/Empty-Background-01.png')
          : require('../assets/bg.jpg')
      }>
      <View style={styles.box1}>
        {joinSucceed ? (
          <View style={styles.iconBox}>
            <Image
              style={styles.Icon}
              source={require('../assets/apples.jpeg')}
            />
            <Image style={styles.Icon} source={require('../assets/wolf.png')} />
            <Image
              style={styles.Icon}
              source={require('../assets/fire1.jpeg')}
            />
            <Image style={styles.Icon} source={require('../assets/bug.jpeg')} />
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
                source={require('../assets/Rosee.jpeg')}
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
          <Animated.View style={[styles.settingBox, ani_box]}>
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
            <TapGestureHandler onGestureEvent={eventHandler}>
              <Animated.View style={[ani_style, styles.border]}>
                <TouchableOpacity
                  onPress={() => send_noti()}
                  onPressIn={join}
                  style={styles.call}>
                  <Image
                    source={require('../assets/accept-call.png')}
                    resizeMode="contain"
                    style={styles.call}
                  />
                </TouchableOpacity>
              </Animated.View>
            </TapGestureHandler>
          ) : (
            <TapGestureHandler onGestureEvent={eventHandler2}>
              <Animated.View style={[ani_style, styles.border]}>
                <TouchableOpacity
                  onPress={leave}
                  style={[styles.call, styles.endcallbtn]}>
                  <Image
                    source={require('../assets/end-call.png')}
                    resizeMode="contain"
                    style={styles.call}
                  />
                </TouchableOpacity>
              </Animated.View>
            </TapGestureHandler>
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
