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
} from 'react-native';
import _ from 'lodash';

const h = _.range(0, 24);
const HOURS = ['', '', '', ...h, '', '', ''];

// eslint-disable-next-line react/display-name
const AndroidPickerTimeHour = memo(({ onIndexChanged, itemHeight, fontSize, date }) => {
  const hourFlatlistRef = useRef();

  const [hour, setHour] = useState(0);
  const [itemWidth, setItemWidth] = useState(150);
  const [items, setItems] = useState(HOURS);

  useEffect(() => {
    try {
      if (!_.isDate(date)) {
        return;
      }

      const _hour = date.getHours();
      // console.log('Hour - useEffect[date] hour:', _hour);
      // console.log(date.toISOString());

      if (_hour !== hour) {
        setHour(_hour);
        const index = items.indexOf(_hour);
        scrollToIndex(index - 3);
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const momentumScrollEnd = (event) => {
    try {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);
      onIndexChanged(items[index + 3]);
    } catch (error) {
      console.log(error);
    }
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
          <Text style={{ ...styles.pickerItem, fontSize }}>{item}</Text>
        </Animated.View>
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const _keyExtractor = useCallback((item, index) => {
    const _key = 'h' + index.toString();
    return _key;
  }, []);

  const scrollToIndex = (index) => {
    if (index && hourFlatlistRef.current.scrollToIndex) {
      //console.log('scroll to index called !');

      setTimeout(() => {
        hourFlatlistRef.current.scrollToIndex({ animated: true, index: index });
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
            zIndex: 300,
            padding: 0,
            margin: 0,
          }}
        >
          <Animated.FlatList
            ref={hourFlatlistRef}
            data={items}
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
            zIndex: 200,
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

export default AndroidPickerTimeHour;
