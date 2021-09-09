import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Vibration,
  ToastAndroid,
} from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from '../components/hooks';
import styles from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AppNavigationProps } from '../navigation/routes';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
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

const InCall = ({ navigation, route }: AppNavigationProps<'InCall'>) => {
  useRequestAudioHook();
  const {
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    joinChannel,
    leaveChannel,
    setChannelName,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const DURATION = 3000;
  useEffect(() => {
    setChannelName(route.params.channel);
  });

  useEffect(() => {
    Vibration.vibrate([
      0,
      DURATION,
      DURATION / 3,
      DURATION,
      DURATION / 3,
      DURATION,
      DURATION / 3,
      DURATION,
    ]);
  }, []);

  const join = () => {
    Vibration.cancel();
    joinChannel();
    offset.value = 0;
    offset2.value = 0;
  };

  const data = {
    title: 'Reject',
    body: 'Reject',
    data: 'Reject',
    token: route.params.token,
  };

  const send_noti = async () => {
    try {
      await axios.post('http://192.168.1.7:8080/api/notify', data);
    } catch (error) {
      ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
    }
  };

  const leave = () => {
    leaveChannel();
    navigation.navigate('EndCall');
  };

  const decline = async () => {
    Vibration.cancel();
    await send_noti();
    navigation.navigate('Home');
  };

  const pressed = useSharedValue(false);
  const pressed2 = useSharedValue(false);
  const pressed3 = useSharedValue(false);
  const offset = useSharedValue(rh(16));
  const offset2 = useSharedValue(rh(5));
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
  const eventHandler3 = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: () => {
        pressed3.value = true;
      },
      onEnd: () => {
        pressed3.value = false;
      },
    },
  );
  // animation for accept call button
  const ani_style = useAnimatedStyle(() => {
    return {
      borderColor: pressed.value ? '#ffffff' : '#ffffff',
      borderWidth: pressed.value ? 0 : 0,
      transform: [{ scale: withSpring(pressed.value ? 0.6 : 1) }],
    };
  });
  // animation for reject call button
  const ani_style2 = useAnimatedStyle(() => {
    return {
      borderColor: pressed2.value ? '#ffffff' : '#ffffff',
      borderWidth: pressed2.value ? 0 : 0,
      transform: [{ scale: withSpring(pressed2.value ? 0.6 : 1) }],
    };
  });
  // animation for end call button
  const ani_style3 = useAnimatedStyle(() => {
    return {
      borderColor: pressed3.value ? '#ffffff' : '#ffffff',
      borderWidth: pressed3.value ? 0 : 0,
      transform: [{ scale: withSpring(pressed3.value ? 0.6 : 1) }],
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
    <ImageBackground
      style={styles.container}
      source={require('../assets/Gradient-Background-Wallpaper-003.jpg')}>
      <View style={styles.box1}>
        {joinSucceed ? (
          <Animated.View style={[styles.iconBox, ani_box2]}>
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
          </Animated.View>
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.text}>Incoming Call</Text>
          </View>
        )}

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
            {joinSucceed ? (
              <Text style={styles.textava}> Rosé </Text>
            ) : (
              <Text style={styles.textavaincall}> Rosé </Text>
            )}
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
              <View style={styles.counterbox} />
            )}
          </View>
        </View>
      </View>
      <View style={styles.box2}>
        {/* when the user join channel success */}
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
                color={isSpeakerEnable ? '#000000' : '#fff'}
              />
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.box2} />
        )}
        {joinSucceed === false ? (
          <View style={styles.box3}>
            <View style={styles.settingBox}>
              <TapGestureHandler onGestureEvent={eventHandler}>
                <Animated.View style={[ani_style, styles.callBox]}>
                  <TouchableOpacity onPress={join} style={styles.call}>
                    <Image
                      source={require('../assets/accept-call.png')}
                      resizeMode="contain"
                      style={styles.call}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </TapGestureHandler>
              <TapGestureHandler onGestureEvent={eventHandler2}>
                <Animated.View style={[ani_style2, styles.callBox]}>
                  <TouchableOpacity onPress={decline} style={styles.call}>
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
        ) : (
          <View style={styles.callBox}>
            <TapGestureHandler onGestureEvent={eventHandler3}>
              <Animated.View style={ani_style3}>
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
        )}
      </View>
    </ImageBackground>
  );
};
export default InCall;

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
