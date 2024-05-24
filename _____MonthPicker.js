import { useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';

const MonthPicker = (props) => {
  const { onIndexChange, itemHeight, fontSize } = props;

  const [itemWidth, setItemWidth] = useState(150);

  const [items, setItems] = useState(() => {
    return [
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
  });

  const scrollY = useRef(new Animated.Value(0)).current;

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    console.log(index, items[index + 1]);
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
        outputRange: [0.6, 0.7, 0.8, 1, 0.8, 0.7, 0.6],
      });

      return (
        <Animated.View
          style={[{ height: itemHeight, transform: [{ scale }] }, styles.animatedContainer]}
        >
          <Text style={{ ...styles.pickerItem, fontSize }}>{item}</Text>
        </Animated.View>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  try {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'white', width: itemWidth, height: itemHeight * 7 }}>
          <View
            style={{
              ...styles.flatlistContainer,
              height: itemHeight * 7,
              backgroundColor: 'transparent',
              zIndex: 100,
            }}
          >
            <Animated.FlatList
              data={items}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              snapToInterval={itemHeight}
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
          </View>

          <View
            style={{
              backgroundColor: 'silver',
              height: itemHeight,
              position: 'absolute',
              top: 3 * itemHeight,
              width: itemWidth,
              zIndex: 1,
            }}
          >
            <Text></Text>
          </View>
        </View>
      </View>
    );
  } catch (error) {
    console.log(error);
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    width: 100,
    backgroundColor: '#fff',
    position: 'relative',
  },
  pickerItem: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    borderColor: 'red',
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
    // backgroundColor: 'blue',
  },
});

export default MonthPicker;
