import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useCallback, useState } from "react";
import _ from "lodash";

import { ss } from "../../styles/Styles";

const itemData = [
  { title: "Title Text", key: "item1" },
  { title: "Title Text 2", key: "item2" },
  { title: "Title Text 3", key: "item3" },
];

const CustomlistApp = () => {
  console.log("CustomlistApp - render");

  const [counter, setCounter] = useState(0);

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
    // console.log("handleCount with useCallback");
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
        <Text>CustomlistApp</Text>

        <TouchableOpacity style={ss.button} onPress={handleCount}>
          <Text style={ss.text}>count: {counter}</Text>
        </TouchableOpacity>

        {/* <FlatList
          // ItemSeparatorComponent={
          //   Platform.OS !== "android" &&
          //   (({ highlighted }) => <View style={{ marginLeft: 0 }} />)
          // }
          keyExtractor={(itm) => itm.key}
          data={itemData}
          renderItem={onRenderItem}
        /> */}

        <Vehicles data={itemData} />
      </View>
    </SafeAreaView>
  );
};

export default CustomlistApp;

// TODO: Change Flatlist to normal View

const Vehicles = memo(
  ({ data }) => {
    console.log("=> Vehicles - render ");

    return (
      <View>
        {data.map((v, idx) => {
          const handleOnPress = () => {
            console.log(v.title);
          };
          return (
            <View key={idx} style={ss.viewItem}>
              <TouchableOpacity onPress={handleOnPress}>
                <Text style={ss.text}>{v.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  },
  (prev, next) => {
    console.log(`prev === next ${_.isEqual(prev, next)} `);
    return _.isEqual(prev, next);
  },
);

Vehicles.displayName = "Vehicles";
