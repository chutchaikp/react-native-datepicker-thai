import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import _ from 'lodash';
import { useEffect, useState } from 'react';
import AndroidPickerTimeHour from './AndroidPickerTimeHour';
import AndroidPickerTimeMinute from './AndroidPickerTimeMinute';

const newdate = new Date();

const PickerTime = (props) => {
  const [datevalue, setDatevalue] = useState(newdate);

  // const [monthindex, setMonthindex] = useState(0);

  // useEffect(() => {
  //   if (_.isDate(datevalue)) {
  //     // console.log('datevalue',datevalue);
  //   }
  // }, []);

  // useEffect(() => {
  //   // props.onDatevalueChanged(datevalue);
  // }, [datevalue]);

  if (props.showtime === false) {
    return null;
  }
  if (!_.isDate(datevalue)) {
    console.log('===============================');
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AndroidPickerTimeHour
          onIndexChanged={(newhour) => {
            // console.log(newhour);
            const newdate = datevalue;
            newdate.setHours(newhour);
            setDatevalue(newdate);
          }}
          date={datevalue}
          itemHeight={40}
          fontSize={25}
        />

        <AndroidPickerTimeMinute
          onIndexChanged={(newminute) => {
            console.log(newminute);

            const newdate = datevalue;
            newdate.setMinutes(newminute);
            setDatevalue(newdate);
          }}
          date={datevalue}
          itemHeight={40}
          fontSize={25}
        />
      </View>

      <View
        style={{
          // backgroundColor: 'red',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          paddingBottom: 10,
        }}
      >
        <Text style={{ width: 150, textAlign: 'center' }}>ชั่วโมง</Text>
        <Text style={{ width: 150, textAlign: 'center' }}>นาที</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const _now = new Date();
              const _hourIndex = _now.getHours();
              setDatevalue(_now);
              // setMonthindex(_monthIndex);
            }}
          >
            <Text style={styles.buttonText}>NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onCancel();
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onOk(datevalue);
            }}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

          {/* <Text style={{ color: 'red', fontSize: 20 }}>{monthindex}</Text> */}
        </View>
      </View>

      {/* <Text style={{ color: 'red', fontSize: 20 }}>MonthIndex {monthindex}</Text> */}
      {/* {__DEV__ && _.isDate(datevalue) && (
        <Text style={{ fontSize: 22 }}>{datevalue.toISOString()}</Text>
      )}
       */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 0,
    backgroundColor: '#1f1f1f8a',
    height: '100%',
    width: '100%',
    // flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
  },
  wrapper: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // fix show line issue
    width: '100%',
    // z Index: 1,
  },
  buttons: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: 300,
    backgroundColor: 'white',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    width: 55,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonText: {
    fontSize: 15,
    color: 'blue',
    fontWeight: '600',
  },
  textResult: {
    color: 'red',
    fontSize: 25,
  },
});

export default PickerTime;
