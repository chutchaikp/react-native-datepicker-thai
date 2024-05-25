import { useEffect, useRef, useState, memo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

const MONTHSbak = [
  { idx: 0, monthName: 'x' },
  { idx: 1, monthName: 'y' },
  { idx: 2, monthName: 'z' },
  { idx: 3, monthName: 'มกราคม.' },
  { idx: 4, monthName: 'กุมภาพันธ์.' },
  { idx: 5, monthName: 'มีนาคม.' },
  { idx: 6, monthName: 'เมษายน.' },
  { idx: 7, monthName: 'พฤษภาคม.' },
  { idx: 8, monthName: 'มิถุนายน.' },
  { idx: 9, monthName: 'กรกฎาคม.' },
  { idx: 10, monthName: 'สิงหาคม.' },
  { idx: 11, monthName: 'กันยายน.' },
  { idx: 12, monthName: 'ตุลาคม.' },
  { idx: 13, monthName: 'พฤศจิกายน.' },
  { idx: 14, monthName: 'ธันวาคม' },
  { idx: 15, monthName: 'a' },
  { idx: 16, monthName: 'b' },
  { idx: 17, monthName: 'c' },
];


const MONTHS = [
  'x',
  'y' },
  'z' },
  'มกราคม.' },
  'กุมภาพันธ์.' },
  'มีนาคม.' },
  'เมษายน.' },
  { idx: 7, monthName: 'พฤษภาคม.' },
  { idx: 8, monthName: 'มิถุนายน.' },
  { idx: 9, monthName: 'กรกฎาคม.' },
  { idx: 10, monthName: 'สิงหาคม.' },
  { idx: 11, monthName: 'กันยายน.' },
  { idx: 12, monthName: 'ตุลาคม.' },
  { idx: 13, monthName: 'พฤศจิกายน.' },
  { idx: 14, monthName: 'ธันวาคม' },
  { idx: 15, monthName: 'a' },
  { idx: 16, monthName: 'b' },
  { idx: 17, monthName: 'c' },
];

const DayAndroidPicker = ({ onIndexChanged, itemHeight, fontSize, date }) => {
  const flatlistRef = useRef();

  const [monthOfYear, setMonthOfYear] = useState(1);
  const [itemWidth, setItemWidth] = useState(150);
  const [items, setItems] = useState(MONTHS);

  // ue
  // useEffect(() => {
  //   return cleanUp = () => {
  //   }
  // }, []);

  useEffect(() => {
    try {
      if (!_.isDate(date)) {
        return;
      }

      const _month = date.getMonth(); // + 1; ?

      console.log(`_month: ${_month} monthOfYear ${monthOfYear} `);

      if (_month !== monthOfYear) {
        setMonthOfYear(_month);
        scrollToIndex(_month); // onload
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  // useEffect(() => {
  //   console.log('useEffect[dayOfMonth]', dayOfMonth);
  // }, [dayOfMonth]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollToIndex = (index) => {
    console.log('scrollToIndex', index);

    if (index >= 0 && flatlistRef.current.scrollToIndex) {
      console.log('scroll to index called !');
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({ animated: true, index: index });
      }, 100);
    } else {
      console.log('Not found index and flatlistRef.current.scrollToIndex');
    }
  };

  const momentumScrollEnd = (event) => {
    try {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);

      // onIndexChanged(items[index + 3]);
      // console.log('==========momentumScrollEnd========== ', index + 3);
      // console.log(items[index]);
      // console.log('');

      // const newMonth = items[index + 3]
      // onIndexChanged(items[index + 3]);

      console.log('momentumScrollEnd() - new index', index);

      setMonthOfYear(index);

      onIndexChanged(index);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item, index }) => {
    // return (
    //   <View style={{ height: itemHeight, width: itemWidth }}>
    //     <Text style={{ ...styles.pickerItem, fontSize }}>{item.monthName}</Text>
    //   </View>
    // );
    try {
      const inputRange = [
        (index - 6) * itemHeight,
        (index - 5) * itemHeight,
        (index - 4) * itemHeight,
        (index - 3) * itemHeight,
        (index - 2) * itemHeight,
        (index - 1) * itemHeight,
        index * itemHeight,
      ];

      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [0.3, 0.6, 0.8, 1, 0.8, 0.6, 0.3],
      });

      return (
        <Animated.View
          style={[
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: itemHeight,
              width: itemWidth,
              transform: [{ scale }],
            },
            styles.animatedContainer,
          ]}
        >
          <Text style={{ ...styles.pickerItem, fontSize }}>{item.monthName}</Text>
        </Animated.View>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  try {
    return (
      <View
        style={{
          ...styles.com,
          height: itemHeight * 7,
        }}
      >
        <SafeAreaView
          style={{
            ...styles.container,
            height: itemHeight * 7,
            zIndex: 100,
            padding: 0,
            margin: 0,
          }}
        >
          <Animated.FlatList
            ref={flatlistRef}
            data={items}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={itemHeight}
            keyExtractor={(item, index) => index.toString()}
            onMomentumScrollEnd={momentumScrollEnd}
            scrollEventThrottle={16}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
              useNativeDriver: true,
            })}
            getItemLayout={(_, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })}
          />
        </SafeAreaView>

        <View
          style={{
            backgroundColor: 'silver',
            height: itemHeight,
            position: 'absolute',
            top: 3 * itemHeight,
            width: '100%',
            zIndex: 1,
          }}
        >
          <Text></Text>
        </View>

        {__DEV__ && false && (
          <View>
            <TouchableOpacity onPress={() => scrollToIndex(0)}>
              <Text>Go to 0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToIndex(1)}>
              <Text>Go to 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToIndex(2)}>
              <Text>Go to 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => scrollToIndex(3)}>
              <Text>Go to 3</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => scrollToIndex(4)}>
              <Text>Go to 4</Text>
            </TouchableOpacity> */}

            <Text>monthOfYear: {monthOfYear}</Text>
          </View>
        )}
      </View>
    );
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  com: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 32,
  },
  pickerItem: {
    textAlign: 'center',
    color: '#000',
  },
  indicatorHolder: {
    position: 'absolute',
    backgroundColor: 'silver',
  },
  indicator: {
    width: 50,
    height: 1,
    backgroundColor: '#ccc',
  },
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//

// rnss
// const styles = StyleSheet.create({

// })

export default DayAndroidPicker;
