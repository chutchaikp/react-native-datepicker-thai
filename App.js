import { useRef, useState } from 'react';
import _ from 'lodash';
import {
  Animated,
  Button,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PickerDate from './PickerDate';
// import PickerTime from './PickerTime';
// import StyleApp from './debug/StyleApp';
// import PickerTime from './PickerTime';

// import MemorizeApp from './debug/MemorizeApp';
// import UsecallbackApp from './debug/UsecallbackApp';

const AppX = () => {
  return (
    <View style={styles.container}>
      {/* how to memo */}
      {/* <MemorizeApp /> */}
      {/* how to useCallback */}
      {/* <UsecallbackApp /> */}

      {/* <StyleApp /> */}
    </View>
  );
};

const App = () => {
  const [datevalue, setDatevalue] = useState(null);

  const [showdate, setShowdate] = useState(false);
  const [showtime, setShowtime] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setShowdate(!showdate)}>
        <Text style={styles.buttonText}>Show date</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => setShowtime(!showtime)}>
        <Text style={styles.buttonText}>Show time</Text>
      </Pressable>

      <PickerDate
        showdate={showdate}
        onOk={(val) => {
          try {
            let _datevalue = new Date(datevalue);
            const y = val.getFullYear();
            const m = val.getMonth();
            const d = val.getDate();
            _datevalue.setFullYear(y);
            _datevalue.setMonth(m);
            _datevalue.setDate(d);

            setDatevalue(_datevalue);

            setShowdate(false);
          } catch (error) {
            console.log(error);
          }
        }}
        onCancel={() => {
          setShowdate(false);
        }}
      />

      {/* <PickerTime
        showtime={showtime}
        onOk={(val) => {
          console.log(val);
          let _datevalue = new Date(datevalue);
          const h = val.getHours();
          const m = val.getMinutes();

          _datevalue.setHours(h);
          _datevalue.setMinutes(m);

          setDatevalue(_datevalue);
          setShowtime(false);
        }}
        onCancel={() => {
          setShowtime(false);
        }}
      /> */}

      {datevalue && _.isDate(datevalue) && (
        <TouchableOpacity style={{ padding: 20 }}>
          <Text style={styles.textResult}>{datevalue.toISOString()}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1f1f1f',
    // height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    // alignItems: 'center',
    // marginLeft: 30,
    // marginRight: 30,
    position: 'relative',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    // width: 55,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    // fontSize: 26,
    color: 'blue',
    // fontWeight: '700',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textResult: {
    color: '#666',
    fontSize: 20,
  },
});

export default App;
