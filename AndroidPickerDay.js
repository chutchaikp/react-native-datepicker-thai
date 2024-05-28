import { useEffect, useRef, useState, memo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import _ from "lodash";

const y = _.range(1, 32);
const DAYS = ["", "", "", ...y, "", "", ""];

const AndroidPickerDay = memo(
  ({ onIndexChanged, itemHeight, fontSize, dateindex }) => {
    console.log("AndroidPickerDay - rendering...");

    const dayFlatlistRef = useRef();

    // const [dayOfMonth, setDayOfMonth] = useState(1);
    const [itemWidth, setItemWidth] = useState(50);
    const [items, setItems] = useState(DAYS);

    useEffect(() => {
      try {
        console.log(
          `AndroidPickerDay.useEffect[dateindex] dateindex: ${dateindex} `,
        );

        scrollToIndex(dateindex);
      } catch (error) {
        console.log(error);
      }
    }, [dateindex]);

    const scrollY = useRef(new Animated.Value(0)).current;
    const canMomentum = useRef(false);

    const momentumScrollBegin = useCallback(() => {
      canMomentum.current = true;
    }, []);

    const momentumScrollEnd = useCallback((event) => {
      if (canMomentum.current === false) {
        return;
      }

      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);

      console.log("");
      console.log(
        `===========> AndroidPickerDay.momentumScrollEnd(event) index: ${index} scrollY: ${JSON.stringify(
          scrollY,
        )} `,
      );

      canMomentum.current = false;
      onIndexChanged(index);
    }, []);

    const renderItem = useCallback(({ item, index }) => {
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
      const _key = "d" + index.toString();
      return _key;
    }, []);

    const scrollToIndex = (index) => {
      if (index && dayFlatlistRef.current.scrollToIndex) {
        window.setTimeout(() => {
          console.log(`===========> Date. scrollToIndex index: ${index}`);
          dayFlatlistRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }, 10);
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
              ref={dayFlatlistRef}
              data={items}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              snapToInterval={itemHeight}
              keyExtractor={_keyExtractor}
              onMomentumScrollBegin={momentumScrollBegin}
              onMomentumScrollEnd={momentumScrollEnd}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                {
                  useNativeDriver: true,
                },
              )}
              getItemLayout={(_, index) => ({
                length: itemHeight,
                offset: itemHeight * index,
                index,
              })}
            />
          </SafeAreaView>

          <View
            style={{
              backgroundColor: "silver",
              height: itemHeight,
              position: "absolute",
              top: 3 * itemHeight,
              width: "100%",
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
  },
);

const styles = StyleSheet.create({
  com: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 32,
  },
  pickerItem: {
    textAlign: "center",
    color: "#000",
  },
  indicatorHolder: {
    position: "absolute",
    backgroundColor: "silver",
  },
  indicator: {
    width: 50,
    height: 1,
    backgroundColor: "#ccc",
  },
  animatedContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

AndroidPickerDay.displayName = "AndroidPickerDay";

export default AndroidPickerDay;
