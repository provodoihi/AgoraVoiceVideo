import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import styles from '../styles';
import { responsiveHeight as rh } from 'react-native-responsive-dimensions';
import { Stopwatch } from 'react-native-stopwatch-timer';
import messaging from '@react-native-firebase/messaging';
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

import { useInitializeAgora, useRequestAudioHook } from '../components/hooks';
import { AppNavigationProps } from '../navigation/routes';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const DetailScreen = ({ navigation, route }: AppNavigationProps<'Detail'>) => {
  useRequestAudioHook();
  const {
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    joinChannel,
    leaveChannel,
    channelName,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const data = {
    title: 'Call',
    body: channelName,
    data: route.params.callerToken,
    token: route.params.calleeToken,
  };

  const join = async () => {
    try {
      await axios.post('http://192.168.1.7:8080/api/notify', data);
      joinChannel();
      offset.value = 0;
      offset2.value = 0;
    } catch (error) {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
  };

  const leave = () => {
    leaveChannel();
    navigation.navigate('EndCall');
  };

  // auto leave when the remote user reject the call
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification.title === 'Reject') {
        leave();
      }
    });
    return unsubscribe;
  }, []);

  const pressed = useSharedValue(false);
  const offset = useSharedValue(rh(16));
  const offset2 = useSharedValue(rh(5));
  // animation for call button
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
  const ani_style = useAnimatedStyle(() => {
    return {
      borderColor: pressed.value ? '#ffffff' : '#ffffff',
      borderWidth: pressed.value ? 1 : 0,
      transform: [{ scale: withSpring(pressed.value ? 0.6 : 1) }],
    };
  });

  // animation for microphone speaker bar
  const ani_box = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withDelay(1200, withSpring(offset.value)) }],
    };
  });

  // animation for top icon
  const ani_box2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withDelay(800, withSpring(offset2.value)) }],
    };
  });

  return (
    <View style={styles.container}>
      {joinSucceed === false ? (
        <View>
          <View style={styles2.background}>
            <TouchableOpacity
              style={styles2.arrow}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Icon name="arrow-circle-left" size={36} color="white" />
            </TouchableOpacity>
            <Text style={styles2.text}>{route.params.name}</Text>
          </View>
          <View style={styles2.body}>
            <View style={styles2.phone}>
              <Text
                style={{
                  fontWeight: 'bold',
                  marginLeft: '4%',
                  fontSize: 16,
                  flex: 2,
                }}>
                0123456789
              </Text>
              <View
                style={{
                  flex: 1.5,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity onPress={join}>
                  <Icon name="phone" size={32} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Video')}>
                  <Ionicons name="videocam" size={32} color="green" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        // when the user join channel success
        <View style={styles.container}>
          <View style={styles.box1}>
            <Animated.View style={[styles.iconBox, ani_box2]}>
              <Image
                style={styles.Icon}
                source={require('../assets/apples.jpeg')}
              />
              <Image
                style={styles.Icon}
                source={require('../assets/wolf.png')}
              />
              <Image
                style={styles.Icon}
                source={require('../assets/fire1.jpeg')}
              />
              <Image
                style={styles.Icon}
                source={require('../assets/bug.jpeg')}
              />
            </Animated.View>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Image
                style={styles.ava}
                source={require('../assets/Rosee.jpeg')}
              />
            </View>
            <View style={styles.usersListContainer}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textava}> {route.params.name} </Text>
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
                    <SimpleLineIcons
                      name="call-out"
                      size={44}
                      color="#00FF00"
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.box2}>
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

            <View style={styles.callBox}>
              <TapGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={ani_style}>
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
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

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

const styles2 = StyleSheet.create({
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
  arrow: {
    position: 'absolute',
    top: '3%',
    left: '4%',
  },
  text: {
    fontSize: 44,
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

export default DetailScreen;
