import { useEffect, useRef, useState, memo, useCallback } from 'react';
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
  // { idx: 4, monthName: 'กุมภาพันธ์.' },
  { idx: 4, monthName: 'feb.' },
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
  '',
  '',
  '',
  'มกราคม.',
  'กุมภาพันธ์.',
  'มีนาคม.',
  'เมษายน.',
  'พฤษภาคม.',
  'มิถุนายน.',
  'กรกฎาคม.',
  'สิงหาคม.',
  'กันยายน.',
  'ตุลาคม.',
  'พฤศจิกายน.',
  'ธันวาคม',
  '',
  '',
  '',
];

let monthOfYear = 0;

const MonthAndroidPicker = memo(({ onIndexChanged, itemHeight, fontSize, monthIndex }) => {
  // console.log('rendering DayAndroidPicker.js component ');

  const monthFlatlistRef = useRef();

  const [itemWidth, setItemWidth] = useState(150);
  const [items, setItems] = useState(MONTHS);

  useEffect(() => {
    try {
      // console.log(`useEffect[monthIndex] - monthIndex: ${monthIndex} monthOfYear ${monthOfYear} `);
      if (monthIndex >= 0) {
        scrollToIndex(monthIndex);
      }
    } catch (error) {
      console.log(error);
    }
  }, [monthIndex]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollToIndex = (index) => {
    if (index >= 0 && monthFlatlistRef.current.scrollToIndex) {
      setTimeout(() => {
        monthFlatlistRef.current.scrollToIndex({ animated: true, index: index });
      }, 50);
    } else {
      console.log('Not found index and flatlistRef.current.scrollToIndex');
    }
  };

  const momentumScrollEnd = (event) => {
    try {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);
      // console.log('on momentumScrollEnd() with index: ' + index);
      monthOfYear = index;
      onIndexChanged(index);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = useCallback(({ item, index }) => {
    // return (
    //   <View
    //     style={{
    //       height: itemHeight,
    //       width: itemWidth,
    //       borderColor: 'red',
    //       borderWidth: 1,
    //     }}
    //   >
    //     <Text style={{ ...styles.pickerItem, fontSize }}>{item}</Text>
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
        outputRange: [0.6, 0.7, 0.8, 1, 0.8, 0.7, 0.6],
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
          <Text style={{ ...styles.pickerItem, fontSize }}>{item}</Text>
        </Animated.View>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  const _keyExtractor = useCallback((item, index) => {
    console.log('keyExtractor', index);
    return index.toString();
  }, []);

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
            ref={monthFlatlistRef}
            data={items}
            //< how optimize
            // initialNumToRender={7}
            // maxToRenderPerBatch={1}
            // windowSize={5}
            // onEndReachedThreshold={0.9}
            // removeClippedSubviews
            // decelerationRate="fast"
            //> how optimize
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            snapToInterval={itemHeight}
            keyExtractor={_keyExtractor}
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
});

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

export default MonthAndroidPicker;
