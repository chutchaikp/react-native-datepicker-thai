import { useRef, useState } from 'react';
import _ from 'lodash';
import {
  Animated,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from './DatePicker';

const App = () => {
  const [datevalue, setDatevalue] = useState(null);

  const [showdate, setShowdate] = useState(false);
  const [showtime, setShowtime] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setShowdate(!showdate)}>
        <Text style={styles.text}>Show date</Text>
      </Pressable>

      {/* <TouchableOpacity onPress={() => setShowdate(!showdate)}>
        <Text>showdate</Text>
      </TouchableOpacity> */}
      {/* <Button>hidedate</Button> */}

      <DatePicker
        showdate={showdate}
        onOk={(val) => {
          setDatevalue(val);
          setShowdate(false);
        }}
        onCancel={() => {
          setShowdate(false);
        }}
        // onDatevalueChanged={(value) => {
        //   setDatevalue(value);
        // }}
      />

      {datevalue && _.isDate(datevalue) && (
        <TouchableOpacity>
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
    justifyContent: 'center',
    // marginLeft: 30,
    // marginRight: 30,
    margin: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#1f1f1f',
    marginLeft: 40,
    marginRight: 40,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#ccc',
  },
  textResult: {
    fontSize: 23,
    lineHeight: 30,
    // fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#333',
  },
});

export default App;
