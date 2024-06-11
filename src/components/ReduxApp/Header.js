import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { ssRedux } from "./Styles";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";

const Header = () => {
  console.log("Header - render...");
  const count = useSelector(selectCount);

  const [coun, setCoun] = useState(0);

  return (
    <View style={ssRedux.viewRow}>
      <Text>Header</Text>
      <Text>{count}</Text>

      <Pressable
        onPress={() => setCoun((c) => c + 1)}
        style={{
          // backgroundColor: "#9f9f9f",
          borderWidth: 2,
          padding: 10,
          borderRadius: 10,
          margin: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Header counter {coun}</Text>
      </Pressable>

      {/* <TouchableWithoutFeedback
        style={{
          borderWidth: 5,
          borderRadius: 20,
          borderColor: "#696969",
          padding: 10,
        }}
      >
        <Text>TouchableWithoutFeedback ???</Text>
      </TouchableWithoutFeedback> */}

      {/* <TouchableHighlight
        style={{
          borderWidth: 5,
          borderRadius: 20,
          borderColor: "#696969",
          padding: 10,
        }}
      >
        <Text>Highlight</Text>
      </TouchableHighlight> */}

      <Text>{coun}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
