import React, { useState } from 'react';
import AgoraUIKit, { PropsInterface } from 'agora-rn-uikit';
import { AppNavigationProps } from '../navigation/routes';

const VideoCall = ({ navigation }: AppNavigationProps<'Voice'>) => {
  const [videoCall, setVideoCall] = useState(true);
  const props: PropsInterface = {
    rtcProps: {
      appId: '9747a594ebdd486c948da607b25aa21c',
      channel: 'TestNew',
    },
    callbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.navigate('Home');
      },
    },
  };
  return videoCall ? (
    <AgoraUIKit rtcProps={props.rtcProps} callbacks={props.callbacks} />
  ) : null;
};

export default VideoCall;
