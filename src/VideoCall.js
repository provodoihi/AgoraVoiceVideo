import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { Text, StyleSheet } from 'react-native';
import VoiceCall from './VoiceCall';

const VideoCall = ({ navigation }) => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appId: 'b1a07dffe71748edb9a4b189fe85a14d',
    channel: 'test123',
    // token:
    //   '00655c2ac98a7314b68898970f4a24fdfd2IAAYrj7C+hDIHcgCY6OjYa57x1DJSOAx+/ZvK/eTiCyXaQx+f9gAAAAAEAC4541oOkjuYAEAAQA5SO5g',
  };
  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('VoiceCall');
    },
  };
  return videoCall ? (
    <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
  ) : (
    <VoiceCall />
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 100,
  },
});
export default VideoCall;
