import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Contacts from 'react-native-contacts';

import ContactCard from '../components/ContactCard';
import { AppNavigationProps } from '../navigation/routes';

const TestContact = ({ navigation }: AppNavigationProps<'Contact'>) => {
  const [myContacts, setMyContacts] = useState([]);

  useEffect(() => {
    getAllContacts();
  }, []);

  async function getAllContacts() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (permission === 'granted') {
        const contacts = await Contacts.getAll();
        console.log(contacts);
        setMyContacts(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons
        name="add-circle"
        size={60}
        color="green"
        style={styles.addIcon}
      />

      <FlatList
        data={myContacts}
        keyExtractor={(item) => item.recordID}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item.recordID)}>
            <ContactCard contactInfo={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TestContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addIcon: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    zIndex: 1,
  },
  search: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'black',
    borderRadius: 25,
  },
});
