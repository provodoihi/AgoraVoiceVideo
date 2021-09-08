import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { AppNavigationProps } from '../navigation/routes';
import firestore from '@react-native-firebase/firestore';
import { responsiveScreenFontSize as rf } from 'react-native-responsive-dimensions';

const TestListScreen = ({ navigation }: AppNavigationProps<'TestList'>) => {
  const [data, setData] = useState([]);
  const [name1, setName] = useState('');
  const [token1, setToken] = useState('');
  const new_contact = {
    name: name1,
    token: token1,
  };

  const getData = async () => {
    try {
      const dataList = [];
      await firestore()
        .collection('user_contact')
        .get()
        .then((doc) =>
          doc.forEach((query) => {
            const { name, token } = query.data();
            dataList.push({
              id: query.id,
              name: name,
              token: token,
            });
          }),
        );
      setData(dataList);
    } catch (error) {
      console.log(error);
    }
  };

  const pushData = async () => {
    try {
      await firestore().collection('user_contact').add(new_contact);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <FlatList
          data={data}
          renderItem={({ item }: any) => {
            return (
              <TouchableOpacity
                style={[styles.button, styles.shadow]}
                activeOpacity={0.8}>
                <View style={styles.rowButton}>
                  <Image
                    style={styles.iconButton}
                    source={require('../assets/fire1.jpeg')}
                  />
                  <View style={styles.col}>
                    <Text style={styles.txtName}>{item.name}</Text>
                    <Text style={styles.txtNormal2}>{item.token}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.container3}>
        <TextInput
          style={styles.txtInput}
          onChangeText={(text) => {
            setName(text);
          }}
          value={name1}
          placeholder="Name"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={(text) => {
            setToken(text);
          }}
          value={token1}
          placeholder="Token"
          placeholderTextColor="#9FA5AA"
          multiline={false}
        />
      </View>
      <View style={styles.container4}>
        <View style={styles.row2}>
          <TouchableOpacity onPress={getData}>
            <Text>Get List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pushData}>
            <Text>Push Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container2: {
    flex: 0.65,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  container3: {
    flex: 0.25,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  container4: {
    flex: 0.1,
    backgroundColor: '#fff',
  },

  row2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtInput: {
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 25,
  },

  txtNormal: {
    padding: '1.5%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'bold',
    color: '#ffffff',
    // alignSelf: 'center',
  },

  txtNormal2: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.6),
    fontWeight: 'normal',
    color: '#4c4c4c',
  },

  txtName: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtButton: {
    padding: '4%',
    margin: '2%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#4c4c4c',
    // alignSelf: 'center',
  },

  txtButtonSmall: {
    fontSize: rf(1.8),
    padding: '5%',
    fontWeight: 'normal',
    color: '#ffffff',
  },

  button: {
    margin: '2.5%',
    marginBottom: '5%',
    width: '90%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },

  buttonSmall: {
    margin: '1.5%',
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#59ADFF',
  },

  button2: {
    margin: '1%',
  },

  row: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  col: {
    flexDirection: 'column',
    margin: '1%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    maxWidth: '80%',
  },

  shadow: {
    shadowColor: '#a2a2a2',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  img: {
    width: '35%',
    height: '35%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '16%',
    height: '60%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});

export default TestListScreen;
