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
import DatePicker from './DatePicker';

const App3 = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>

            <DatePicker
              showdate={true}
              onOk={(val) => {
                // setDatevalue(val);
                // setShowdate(false);
              }}
              onCancel={() => {
                // setShowdate(false);
              }}
              // onDatevalueChanged={(value) => {
              //   setDatevalue(value);
              // }}
            />
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
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

const style2 = StyleSheet.create({
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
});

export default App;
