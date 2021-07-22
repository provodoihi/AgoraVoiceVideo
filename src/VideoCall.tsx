import React, { useState, useEffect } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { AppNavigationProps } from './navigation/routes';

const VideoCall = ({ navigation }: AppNavigationProps<'Voice'>) => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: '9747a594ebdd486c948da607b25aa21c',
    channel: 'TestNew',
    // token:
    //   '00655c2ac98a7314b68898970f4a24fdfd2IAAYrj7C+hDIHcgCY6OjYa57x1DJSOAx+/ZvK/eTiCyXaQx+f9gAAAAAEAC4541oOkjuYAEAAQA5SO5g',
  };
  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('Home');
    },
  };
  return <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />;
};

export default VideoCall;
