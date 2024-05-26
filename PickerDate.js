import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import _ from 'lodash';

import AndroidPickerMonth from './AndroidPickerMonth';
import AndroidPickerDay from './AndroidPickerDay';
import AndroidPickerYear from './AndroidPickerYear';
import { useEffect, useState } from 'react';

const newdate = new Date();

const PickerDate = (props) => {
  const [datevalue, setDatevalue] = useState(newdate);
  const [monthindex, setMonthindex] = useState(0);

  useEffect(() => {
    if (_.isDate(datevalue)) {
      // console.log('datevalue',datevalue);
    }
  }, []);

  useEffect(() => {
    // props.onDatevalueChanged(datevalue);
  }, [datevalue]);

  if (props.showdate === false) {
    return null;
  }
  if (!_.isDate(datevalue)) {
    console.log('===============================');
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper} onPress={() => props.onCancel()}>
        <AndroidPickerDay
          onIndexChanged={(_newdate) => {
            const dv = datevalue;
            const d = dv.getDate();
            const m = dv.getMonth();
            const y = dv.getFullYear();
            const newdate = new Date(y, m, _newdate, 8, 0, 0);
            setDatevalue(newdate);
          }}
          date={datevalue}
          itemHeight={40}
          fontSize={18}
        />

        <AndroidPickerMonth
          onIndexChanged={(newmonthIndex) => {
            try {
              const dv = datevalue;
              const d = dv.getDate();
              const m = dv.getMonth();
              const y = dv.getFullYear();
              setMonthindex(newmonthIndex);
              const newdate = datevalue;
              newdate.setMonth(newmonthIndex);
              // console.log('DatePicker.js newdate', newdate);
              setDatevalue(newdate);
            } catch (error) {
              console.log(error);
            }
          }}
          monthIndex={monthindex}
          date={datevalue}
          itemHeight={40}
          fontSize={18}
        />
        <AndroidPickerYear
          onIndexChanged={(_newyear) => {
            const dv = datevalue;
            const d = dv.getDate();
            const m = dv.getMonth();
            const y = dv.getFullYear();
            const newdate = new Date(_newyear - 543, m, d, 8, 0, 0);
            setDatevalue(newdate);
          }}
          date={datevalue}
          itemHeight={40}
          fontSize={18}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              const _today = new Date();
              const _monthIndex = _today.getMonth();
              setDatevalue(_today);
              setMonthindex(_monthIndex);
            }}
          >
            <Text style={styles.buttonText}>วันนี้</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onCancel();
            }}
          >
            <Text style={styles.buttonText}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onOk(datevalue);
            }}
          >
            <Text style={styles.buttonText}>ตกลง</Text>
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
    backgroundColor: '#1f1f1fba',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    // left: 0,
    // top: 0,
  },
  wrapper: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    // fix show line issue
    width: '100%',
    // z Index: 100,
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
    color: 'blue',
    fontWeight: '700',
  },
  textResult: {
    color: 'red',
    fontSize: 25,
  },
});

export default PickerDate;
