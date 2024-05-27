import { StyleSheet } from 'react-native';

export const ss = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    // borderRadius: 10,
    backgroundColor: '#fff',
    // borderWidth: 3,
    // borderColor: "#02856b",
    borderWidth: 2,
    borderColor: '#666666',
  },
  // button color: white: background: blue
  buttonBlue: {
    backgroundColor: '#0f53ff',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  textButton: {
    color: '#666',
  },
  textButtonBlue: {
    color: '#fff',
  },
  textGreen: {
    fontSize: 20,
    color: '#1f1f',
  },
  viewRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  viewLog: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 55,
  },
});
