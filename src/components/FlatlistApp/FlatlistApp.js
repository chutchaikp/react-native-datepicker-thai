import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { ss } from "../../styles/Styles";

const itemData = [
  { title: "Title Text", key: "item1" },
  { title: "Title Text 2", key: "item2" },
  { title: "Title Text 3", key: "item3" },
];
const FlatlistApp = () => {
  console.log("FlatlistApp - render");

  const [counter, setCounter] = useState(0);

  // const [itemData] = useState(() => {
  //   return [
  //     { title: "Title Text", key: "item1" },
  //     { title: "Title Text 2", key: "item2" },
  //     { title: "Title Text 3", key: "item3" },
  //   ];
  // });

  const onRenderItem = ({ item, index, separators }) => {
    console.log("onRenderItem");

    console.log("Flatlist - onRenderItem");
    return (
      <TouchableHighlight
        key={item.key}
        onPress={() => console.log("Onpress")}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={{ margin: 5, padding: 3, backgroundColor: "white" }}>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const handleCount = useCallback(() => {
    console.log("handleCount with useCallback");
    setCounter((c) => c + 1);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignSelf: "stretch",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <View>
        <Text>FlatlistAop</Text>

        <TouchableOpacity style={ss.button} onPress={handleCount}>
          <Text>count: {counter}</Text>
        </TouchableOpacity>

        <FlatList
          // ItemSeparatorComponent={
          //   Platform.OS !== "android" &&
          //   (({ highlighted }) => <View style={{ marginLeft: 0 }} />)
          // }
          keyExtractor={(itm) => itm.key}
          data={itemData}
          renderItem={onRenderItem}

          // initialNumToRender={2}
          // updateCellsBatchingPeriod={100}
          // maxToRenderPerBatch={5}
          // windowSize={5}
        />
      </View>
    </SafeAreaView>
  );
};

export default FlatlistApp;

const styles = StyleSheet.create({});
