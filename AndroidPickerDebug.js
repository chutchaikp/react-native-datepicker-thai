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

const y = _.range(1, 32);
const DAYS = ['', '', '', ...y, '', '', ''];

const AndroidPickerDebug = ({ onIndexChanged, itemHeight, fontSize, date }) => {
  console.log('AndroidPickerDebug - render...');

  //   const {items, onIndexChange, itemHeight} = props;
  const [items, setItems] = useState(DAYS);

  const momentumScrollEnd = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / itemHeight);
    console.log('index', index);
    onIndexChanged(index);
  };

  const renderItem = ({ item }) => {
    return <Text style={[styles.pickerItem, { height: itemHeight }]}>{item}</Text>;
  };

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
        <FlatList
          data={items}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          onMomentumScrollEnd={momentumScrollEnd}
          keyExtractor={(item, idx) => {
            return idx.toString();
          }}
        />
      </SafeAreaView>
    </View>
  );

  // try {
  //   return (
  //     <View
  //       style={{
  //         ...styles.com,
  //         height: itemHeight * 7,
  //       }}
  //     >
  //       <SafeAreaView
  //         style={{
  //           ...styles.container,
  //           height: itemHeight * 7,
  //           zIndex: 300,
  //           padding: 0,
  //           margin: 0,
  //         }}
  //       >
  //         <Animated.FlatList
  //           // ref={dayFlatlistRef}
  //           data={items}
  //           renderItem={renderItem}
  //           showsVerticalScrollIndicator={false}
  //           snapToInterval={itemHeight}
  //           keyExtractor={(item, index) => {
  //             return index.toString();
  //           }}
  //           onMomentumScrollEnd={momentumScrollEnd}
  //           // scrollEventThrottle={16}
  //           // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
  //           //   useNativeDriver: true,
  //           // })}
  //           // getItemLayout={(_, index) => ({
  //           //   length: itemHeight,
  //           //   offset: itemHeight * index,
  //           //   index,
  //           // })}
  //         />
  //       </SafeAreaView>

  //       <View
  //         style={{
  //           backgroundColor: 'silver',
  //           height: itemHeight,
  //           position: 'absolute',
  //           top: 3 * itemHeight,
  //           width: '100%',
  //           zIndex: 200,
  //         }}
  //       >
  //         <Text></Text>
  //       </View>
  //     </View>
  //   );
  // } catch (error) {
  //   console.log(error);
  // }
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

export default AndroidPickerDebug;
