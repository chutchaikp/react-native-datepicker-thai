import { memo, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Animated } from "react-native";
import _ from "lodash";

const fy = new Date().getFullYear();
const y = _.range(fy - 3 + 543, fy + 543 + 1);
const YEARS = ["", "", "", ...y, "", "", ""];

const AndroidPickerYear = memo(
  ({ onIndexChanged, itemHeight, fontSize, yearindex }) => {
    // console.log("AndroidPickerYear - rendering...");

    const yearFlatlistRef = useRef();

    const [itemWidth] = useState(100);
    const [items] = useState(YEARS);

    useEffect(() => {
      try {
        // console.log(
        //   `AndroidPickerYear.useEffect[dateindex] dateindex: ${yearindex} `,
        // );

        // const _year = date.getFullYear();
        // if (_year !== year) {
        //   setYear(_year);
        //   const index = items.indexOf(parseInt(_year) + 543);
        //   // console.log(items);
        //   // console.log('_year', _year);
        //   // console.log(items.indexOf(parseInt(_year) + 543));
        //   scrollToIndex(index - 3); // onload
        // }

        scrollToIndex(yearindex);
      } catch (error) {
        console.log(error);
      }
    }, [yearindex]);

    const scrollY = useRef(new Animated.Value(0)).current;
    const canMomentum = useRef(false);

    const momentumScrollBegin = useCallback(() => {
      canMomentum.current = true;
    }, []);

    const scrollToIndex = (index) => {
      if (index && yearFlatlistRef.current.scrollToIndex) {
        //console.log('scroll to index called !');

        window.setTimeout(() => {
          // console.log(`===========> Year. scrollToIndex index: ${index}`);
          yearFlatlistRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }, 10);
      }
    };

    const _keyExtractor = useCallback((item, index) => {
      const _key = "y" + index.toString();
      return _key;
    }, []);

    const momentumScrollEnd = useCallback((event) => {
      if (canMomentum.current === false) {
        return;
      }

      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / itemHeight);

      // console.log("");
      // console.log(
      //   `AndroidPickerYear.momentumScrollEnd(event) index: ${index} scrollY: ${JSON.stringify(
      //     scrollY,
      //   )} `,
      // );

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

    try {
      return (
        <View
          style={{
            ...styles.com,
            height: itemHeight * 7,
            padding: 0,
            margin: 0,
            // backgroundColor: '#1f1f',
          }}
        >
          <SafeAreaView
            style={{
              ...styles.container,
              height: itemHeight * 7,
              zIndex: 300,
              // backgroundColor: 'blue',
              padding: 0,
              margin: 0,
            }}
          >
            <Animated.FlatList
              ref={yearFlatlistRef}
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
    // height: 200,
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 0,
    margin: 0,
    // alignItems: 'center',
    // alignContent: 'center',
    // marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: 'green',
    // height: 200,
  },
  // item: {
  //   backgroundColor: '#f9c2ff',
  //   padding: 20,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  title: {
    fontSize: 32,
  },
  pickerItem: {
    // fontWeight: '600',
    textAlign: "center",
    color: "#000",
    // borderColor: 'red',
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
    // backgroundColor: 'blue',
  },
});

AndroidPickerYear.displayName = "AndroidPickerYear";

export default AndroidPickerYear;
