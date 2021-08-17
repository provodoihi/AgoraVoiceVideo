import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Vibration,
} from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from './hooks';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AppNavigationProps } from './navigation/routes';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    ]);
  }, []);

  const join = () => {
    Vibration.cancel();
    joinChannel();
  };

  const leave = () => {
    leaveChannel();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 400);
  };

  const decline = () => {
    Vibration.cancel();
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      style={styles.container}
      source={
        joinSucceed
          ? require('./assets/Empty-Background-01.png')
          : require('./assets/Gradient-Background-Wallpaper-003.jpg')
      }>
      <View style={styles.box1}>
        {joinSucceed ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '3%',
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
            <Text style={styles.text}>Incoming Call</Text>
          </View>
        )}

        <View style={{ flex: 2, justifyContent: 'flex-end' }}>
          <View>
            <Image style={styles.ava} source={require('./assets/Rosee.jpeg')} />
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
                color={isSpeakerEnable ? '#000000' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.box2} />
        )}
        {joinSucceed === false ? (
          <View style={styles.box3}>
            <View style={styles.settingBox}>
              <View style={styles.callBox}>
                <TouchableOpacity onPress={join} style={styles.call}>
                  <Image
                    source={require('./assets/accept-call.png')}
                    resizeMode="contain"
                    style={styles.call}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.callBox}>
                <TouchableOpacity onPress={decline} style={styles.call}>
                  <Image
                    source={require('./assets/end-call.png')}
                    resizeMode="contain"
                    style={styles.call}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.callBox}>
            <TouchableOpacity
              onPress={leave}
              style={[styles.call, styles.endcallbtn]}>
              <Image
                source={require('./assets/end-call.png')}
                resizeMode="contain"
                style={styles.call}
              />
            </TouchableOpacity>
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
