import { StyleSheet, View } from 'react-native';
import MonthAndroidPicker from './MonthAndroidPicker';
import DayAndroidPicker from './DayAndroidPicker';
import YearAndroidPicker from './YearAndroidPicker';

const DatePicker = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <DayAndroidPicker itemHeight={40} fontSize={22} />
        <MonthAndroidPicker itemHeight={40} fontSize={22} />
        <YearAndroidPicker itemHeight={40} fontSize={22} />
      </View>

      <View style={styles.buttons}></View>
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

export default DatePicker;
