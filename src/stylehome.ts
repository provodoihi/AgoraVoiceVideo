import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBar: {
    height: '16%',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  text: {
    color: 'blue',
    fontSize: 18,
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
    marginHorizontal: '2%',
  },
  headerText: {
    marginTop: '4%',
    fontWeight: 'bold',
    fontSize: 34,
    marginLeft: '3%',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 22
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  viewInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 30,
    color: '#999',
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'blue',
    fontWeight: 'bold',
  },
  textInfo: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles;
