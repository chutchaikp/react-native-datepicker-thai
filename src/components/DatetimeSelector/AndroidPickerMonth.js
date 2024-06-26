import { useEffect, useRef, useState, memo, useCallback } from "react";
import { StyleSheet, Text, View, SafeAreaView, Animated } from "react-native";
// import _ from "lodash";

const MONTHS = [
  "",
  "",
  "",
  "มกราคม.",
  "กุมภาพันธ์.",
  "มีนาคม.",
  "เมษายน.",
  "พฤษภาคม.",
  "มิถุนายน.",
  "กรกฎาคม.",
  "สิงหาคม.",
  "กันยายน.",
  "ตุลาคม.",
  "พฤศจิกายน.",
  "ธันวาคม",
  "",
  "",
  "",
];

const AndroidPickerMonth = memo(
  ({ onIndexChanged, itemHeight, fontSize, monthindex }) => {
    // console.log("AndroidPickerMonth - rendering...");

    const monthFlatlistRef = useRef();

    // const [month, setMonth] = useState(0);
    const [itemWidth] = useState(150);
    const [items] = useState(MONTHS);

    useEffect(() => {
      try {
        // console.log(
        //   `AndroidPickerMonth.useEffect[dateindex] monthindex: ${monthindex} `,
        // );

        // const _month = date.getMonth();
        // if (_month !== month) {
        //   setMonth(_month);
        //   scrollToIndex(_month);
        // }
        scrollToIndex(monthindex);
      } catch (error) {
        console.log(error);
      }
    }, [monthindex]);

    const scrollY = useRef(new Animated.Value(0)).current;
    const canMomentum = useRef(false);

    const momentumScrollBegin = useCallback(() => {
      canMomentum.current = true;
    }, []);

    const scrollToIndex = (index) => {
      try {
        if (index >= 0 && monthFlatlistRef.current.scrollToIndex) {
          window.setTimeout(() => {
            try {
              // console.log(`===========> Month. scrollToIndex index: ${index}`);
              monthFlatlistRef.current.scrollToIndex({
                animated: true,
                index: index,
              });
            } catch (error) {
              console.log(error);
            }
          }, 10);
        } else {
          console.log("Not found index and flatlistRef.current.scrollToIndex");
        }
      } catch (ex) {
        console.log(ex);
      }
    };

    const momentumScrollEnd = useCallback((event) => {
      try {
        if (canMomentum.current === false) {
          return;
        }

        const y = event.nativeEvent.contentOffset.y;
        const index = Math.round(y / itemHeight);

        // console.log("");
        // console.log(
        //   `AndroidPickerMonth.momentumScrollEnd(event) index: ${index} scrollY: ${JSON.stringify(
        //     scrollY,
        //   )} `,
        // );

        canMomentum.current = false;
        onIndexChanged(index);
      } catch (error) {
        console.log(error);
      }
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
          outputRange: [0.6, 0.7, 0.8, 1, 0.8, 0.7, 0.6],
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
      const _key = "m" + index.toString();
      return _key;
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
              zIndex: 300,
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

AndroidPickerMonth.displayName = "AndroidPickerMonth";

export default AndroidPickerMonth;
