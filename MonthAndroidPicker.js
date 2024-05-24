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
} from 'react-native';
import _ from 'lodash';

const MONTHS = [
  { index: 0, name: 'x' },
  { index: 1, name: 'y' },
  { index: 2, name: 'z' },
  { index: 3, name: 'มกราคม.' },
  { index: 4, name: 'กุมภาพันธ์.' },
  { index: 5, name: 'มีนาคม.' },
  { index: 6, name: 'เมษายน.' },
  { index: 7, name: 'พฤษภาคม.' },
  { index: 8, name: 'มิถุนายน.' },
  { index: 9, name: 'กรกฎาคม.' },
  { index: 10, name: 'สิงหาคม.' },
  { index: 11, name: 'กันยายน.' },
  { index: 12, name: 'ตุลาคม.' },
  { index: 13, name: 'พฤศจิกายน.' },
  { index: 14, name: 'ธันวาคม' },
  { index: 15, name: 'a' },
  { index: 16, name: 'b' },
  { index: 17, name: 'c' },
];

const DayAndroidPicker = ({ onIndexChanged, itemHeight, fontSize, date }) => {
  const flatlistRef = useRef();

  const [monthOfYear, setMonthOfYear] = useState(1);
  const [itemWidth, setItemWidth] = useState(150);
  const [items, setItems] = useState(MONTHS);

  useEffect(() => {
    try {
      if (!_.isDate(date)) {
        return;
      }

      const _month = date.getMonth(); // + 1; ?

      console.log(`_month: ${_month} monthOfYear ${monthOfYear} `);

      if (_month !== monthOfYear) {
        setMonthOfYear(_month);
        const month = items.find((itm) => itm.index - 3 === _month);
        // .indexOf(_month);
        // scrollToIndex(month.index - 3);
        console.log('----------month.index----------', month.index);
        scrollToIndex(month.index);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  // useEffect(() => {
  //   console.log('useEffect[dayOfMonth]', dayOfMonth);
  // }, [dayOfMonth]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    // onIndexChanged(items[index + 3]);
    console.log('==================== ', index);
    onIndexChanged(items[index]);
  };

  const renderItem = ({ item, index }) => {
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
          <Text style={{ ...styles.pickerItem, fontSize }}>{item.name}</Text>
        </Animated.View>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const scrollToIndex = (index) => {
    console.log('scrollToIndex', index);

    if (index && flatlistRef.current.scrollToIndex) {
      console.log('scroll to index called !');
      setTimeout(() => {
        flatlistRef.current.scrollToIndex({ animated: true, index: index });
      }, 50);
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

export default DayAndroidPicker;
