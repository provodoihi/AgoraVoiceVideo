import { StyleSheet } from 'react-native';

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
  border: {
    height: 72,
    width: 72,
    borderRadius: 36,
  },
});

export default styles;
