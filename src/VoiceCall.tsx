import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useInitializeAgora, useRequestAudioHook } from './hooks';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { AppNavigationProps } from './navigation/routes';
import axios from 'axios';

const VoiceCall = ({ navigation }: AppNavigationProps<'Voice'>) => {
  useRequestAudioHook();
  const {
    channelName,
    isMute,
    isSpeakerEnable,
    joinSucceed,
    peerIds,
    setChannelName,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
    isStopwatchStart,
    resetStopwatch,
  } = useInitializeAgora();

  const data = {
    notification: {
      title: 'Your Title',
      text: 'Your Text',
    },
    to:
      'device token',
  };

  const send_noti = (param: boolean) => {
    if (param === false) {
      axios.post('https://fcm.googleapis.com/fcm/send', data, {
        headers: {
          Authorization:
            'key= sv key',
        },
      });
    } else {
      console.log('Not send');
    }
  };

  return (
    <ImageBackground
      blurRadius={3}
      source={require('./assets/background.jpeg')}
      style={styles.container}>
      <View style={styles.box1}>
        {joinSucceed ? (
          <View />
        ) : (
          <View style={{ width: '100%', alignItems: 'center' }}>
            <Text style={styles.text}> Channel Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setChannelName(text)}
              placeholder={'Channel Name'}
              value={channelName}
            />
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {joinSucceed ? (
            <Icons name="phone-in-talk" size={90} color="#fff" />
          ) : (
            <Icons name="phone" size={90} color="#fff" />
          )}
        </View>
        <View style={styles.usersListContainer}>
          {Object.keys(peerIds).length == 0 ? (
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text style={{ color: '#fff' }}>
                You are not calling to anyone
              </Text>
            </View>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: '#fff' }}>{`Calling ${
                peerIds[Object.keys(peerIds).pop()]
              } `}</Text>
              <Stopwatch
                start={isStopwatchStart}
                //To start
                reset={resetStopwatch}
                //To reset
                options={options}
                //options for the styling
              />
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
          <TouchableOpacity
            onPress={() => send_noti(joinSucceed)}
            onPressIn={joinSucceed ? leaveChannel : joinChannel}
            style={styles.call}>
            <Image
              source={
                joinSucceed
                  ? require('./assets/end-call.png')
                  : require('./assets/accept-call.png')
              }
              resizeMode="contain"
              style={styles.call}
            />
          </TouchableOpacity>
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
