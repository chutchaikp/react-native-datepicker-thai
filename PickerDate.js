import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import _ from 'lodash';

import AndroidPickerMonth from './AndroidPickerMonth';
import AndroidPickerDay from './AndroidPickerDay';
import AndroidPickerYear from './AndroidPickerYear';
import { useCallback, useEffect, useState } from 'react';
import AndroidPickerDebug from './AndroidPickerDebug';
import { ss } from './Style';

const newdate = new Date();

const PickerDate = (props) => {
  const [datevalue, setDatevalue] = useState(newdate);

  const [dateindex, setDateindex] = useState(newdate.getDate());
  const [monthindex, setMonthindex] = useState(newdate.getMonth());
  const [yearindex, setYearindex] = useState(newdate.getFullYear() - 2021);

  // useEffect(() => {
  //   if (_.isDate(datevalue)) {
  //     // console.log('datevalue',datevalue);
  //   }
  // }, []);

  useEffect(() => {
    // props.onDatevalueChanged(datevalue);
    // 3 + ? = 2024
    const nd = new Date(yearindex + 2021, monthindex, dateindex + 1, 8, 8, 8);
    setDatevalue(nd);
  }, [dateindex, monthindex, yearindex]);

  const dateOnIndexChanged = useCallback((index) => {
    console.log(`PickerDate.AndroidPickerDay.onIndexChanged index: ${index}`);
    setDateindex(index);
  }, []);

  const monthOnIndexChanged = useCallback((index) => {
    console.log(`PickerDate.AndroidPickerMonth.onIndexChanged index: ${index} `);
    setMonthindex(index);
  }, []);

  const yearOnIndexChanged = useCallback((index) => {
    console.log(`PickerDate.AndroidPickerYear.onIndexChanged index: ${index} `);
    setYearindex(index);
  }, []);

  if (props.showdate === false) {
    return null;
  }
  if (!_.isDate(datevalue)) {
    console.log('===============================');
    return <Text>Loading..........</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={ss.viewLog}>
        {/* console.log(today.toLocaleDateString("en-US")); // 9/17/2016 */}
        <Text style={ss.textGreen}>
          {datevalue.toLocaleDateString('th-TH')} {datevalue.toLocaleTimeString('th-TH')}
        </Text>
        {/* <Text style={ss.textGreen}>
          {datevalue.toLocaleDateString('en-US')} {datevalue.toLocaleTimeString('en-US')}
        </Text>
        <Text style={ss.textGreen}>{datevalue.toISOString()}</Text> */}
        <Text style={ss.textGreen}>{monthindex}</Text>
      </View>
      <View style={styles.wrapper} onPress={() => props.onCancel()}>
        {/* <AndroidPickerDebug
          onIndexChanged={(txt) => {
            console.log(txt);
          }}
          // date={datevalue}
          itemHeight={40}
          fontSize={18}
        /> */}

        <AndroidPickerDay
          onIndexChanged={dateOnIndexChanged}
          dateindex={dateindex}
          itemHeight={40}
          fontSize={18}
        />

        <AndroidPickerMonth
          onIndexChanged={monthOnIndexChanged}
          monthindex={monthindex}
          itemHeight={40}
          fontSize={18}
        />

        <AndroidPickerYear
          onIndexChanged={yearOnIndexChanged}
          yearindex={yearindex}
          itemHeight={40}
          fontSize={18}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              // TODO: not working now

              const _today = new Date();
              const _date = _today.getDate();
              const _month = _today.getMonth();
              const _year = _today.getFullYear();

              // TODO: how to TODAY
              // const nd = new Date(yearindex + 2021, monthindex, dateindex + 1, 8, 8, 8);
              setDateindex(_date - 1);
              setMonthindex(_month);
              setYearindex(_year - 2021);
            }}
          >
            <Text style={ss.textButton}>วันนี้</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              props.onCancel();
            }}
          >
            <Text style={ss.textButton}>ยกเลิก</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={ss.button}
            onPress={() => {
              props.onOk(datevalue);
            }}
          >
            <Text style={ss.buttonText}>ตกลง</Text>
          </TouchableOpacity>
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
