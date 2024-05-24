import { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';

import YearPicker from './YearPicker';
import MonthPicker from './MonthPicker';
import DayPicker from './DayPicker';
import MonthAndroidPicker from './MonthAndroidPicker';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <Text>Hi</Text> */}

      <View style={styles.wrapper}>
        {/* <DayPicker itemHeight={40} fontSize={22} />
        <MonthPicker itemHeight={40} fontSize={22} />
        <YearPicker itemHeight={40} fontSize={22} /> */}

        <MonthAndroidPicker itemHeight={40} fontSize={22} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 100,
    // backgroundColor: '#410a0a',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '100%',
  },
});

export default App;
