import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppNavigationProps } from './navigation/routes';

const Home = ({ navigation }: AppNavigationProps<'Home'>) => {
  return (
    <ImageBackground
      blurRadius={3}
      source={require('./assets/background.jpeg')}
      style={styles.container}>
      <View style={styles.box2}>
        <Image style={styles.call} source={require('./assets/ggvoice.png')} />
        <Text style={styles.txtBig}>Mr.T Call</Text>
      </View>
      <View style={styles.settingBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Voice')}
          style={styles.button}>
          <Icon name="microphone" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Video')}>
          <Ionicons name="videocam" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.settingBox2}>
        <Text style={styles.txt}>Voice Call</Text>
        <Text style={styles.txt}>Video Call</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    marginTop: '2%',
    borderColor: '#fff',
    borderWidth: 1,
    width: '95%',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: '#fff',
  },
  box1: {
    flex: 1.2,
    alignItems: 'center',
  },
  box2: {
    marginTop: '2%',
    flex: 0.5,
    alignItems: 'center',
  },
  callBox: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    marginBottom: '5%',
  },
  text: {
    marginTop: '5%',
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  call: {
    width: 144,
    height: 144,
    resizeMode: 'contain',
  },
  settingBox: {
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },
  settingBox2: {
    marginTop: '1.5%',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  usersListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatRight: {
    height: 72,
    width: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#fff',
  },
  txtBig: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Home;
