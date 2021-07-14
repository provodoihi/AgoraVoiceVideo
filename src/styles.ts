import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: '3%',
    flex: 1.2,
    alignItems: 'center',
  },
  box2: {
    flex: 1,
  },
  callBox: {
    marginBottom: '10%',
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginTop: '2%',
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  call: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  settingBox: {
    alignItems: 'flex-end',
    flex: 2,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: '10%',
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
  speaker: {
    height: 40,
    width: 40,
  },
});
