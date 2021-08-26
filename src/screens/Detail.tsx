import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AppNavigationProps } from '../navigation/routes';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const Detail = ({ route }: AppNavigationProps<'Detail'>) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.text}>{route.params.item.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Detail;
