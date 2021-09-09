import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import RtcEngine from 'react-native-agora';
import uuid from 'react-native-uuid';
import { requestAudioPermission } from './permissions';

export const useRequestAudioHook = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestAudioPermission();
    }
  }, []);
};

export const useInitializeAgora = () => {
  const appId = '9747a594ebdd486c948da607b25aa21c';
  const token = '';

  const navigation = useNavigation();
  const [channelName, setChannelName] = useState<string | number[]>(uuid.v4());
  const [joinSucceed, setJoinSucceed] = useState<boolean>(false);
  const [peerIds, setPeerIds] = useState([]);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isSpeakerEnable, setIsSpeakerEnable] = useState<boolean>(true);
  const rtcEngine = useRef(null);
  const [isStopwatchStart, setIsStopwatchStart] = useState<boolean>(false);
  const [resetStopwatch, setResetStopwatch] = useState<boolean>(false);

  const initAgora = useCallback(async () => {
    rtcEngine.current = await RtcEngine.create(appId);

    await rtcEngine.current?.enableAudio();
    await rtcEngine.current?.muteLocalAudioStream(false);
    await rtcEngine.current?.setEnableSpeakerphone(true);

    // This callback occurs when the remote user successfully joins the channel.
    rtcEngine.current?.addListener('UserJoined', (uid: any, elapsed: any) => {
      console.log('UserJoined', uid, elapsed);

      setPeerIds((peerIdsLocal) => {
        if (peerIdsLocal.indexOf(uid) === -1) {
          return [...peerIdsLocal, uid];
        }

        return peerIdsLocal;
      });
      // start the counter when remote user joins
      setIsStopwatchStart(true);
      setResetStopwatch(false);
    });

    // This callback occurs when the remote user leaves the channel or drops offline.
    rtcEngine.current?.addListener('UserOffline', (uid: any, reason: any) => {
      console.log('UserOffline', uid, reason);
      setPeerIds([]);
      // when the remote user leaves, local user auto ends call and leaves too
      setJoinSucceed(false);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    });

    // This callback occurs when the local user successfully joins the channel.
    rtcEngine.current?.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);

        setJoinSucceed(true);

        setPeerIds((peerIdsLocal) => {
          return [...peerIdsLocal, uid];
        });
      },
    );

    rtcEngine.current?.addListener('Error', (error) => {
      console.log('Error', error);
    });
  }, [navigation]);

  const joinChannel = useCallback(async () => {
    await rtcEngine.current?.joinChannel(token, channelName, null, 0);
  }, [channelName]);

  const leaveChannel = useCallback(async () => {
    await rtcEngine.current?.leaveChannel();
    setIsStopwatchStart(false);
    setResetStopwatch(true);
    setPeerIds([]);
    setJoinSucceed(false);
    console.log('Leave channel');
  }, []);

  const toggleIsMute = useCallback(async () => {
    await rtcEngine.current?.muteLocalAudioStream(!isMute);
    setIsMute(!isMute);
  }, [isMute]);

  const toggleIsSpeakerEnable = useCallback(async () => {
    await rtcEngine.current?.setEnableSpeakerphone(!isSpeakerEnable);
    setIsSpeakerEnable(!isSpeakerEnable);
  }, [isSpeakerEnable]);

  const destroyAgoraEngine = useCallback(async () => {
    await rtcEngine.current?.destroy();
  }, []);

  useEffect(() => {
    initAgora();

    return () => {
      destroyAgoraEngine();
    };
  }, [destroyAgoraEngine, initAgora]);

  return {
    channelName,
    isMute,
    isSpeakerEnable,
    joinSucceed,
    setJoinSucceed,
    peerIds,
    isStopwatchStart,
    resetStopwatch,
    setChannelName,
    joinChannel,
    leaveChannel,
    toggleIsMute,
    toggleIsSpeakerEnable,
  };
};
