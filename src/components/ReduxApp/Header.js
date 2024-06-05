import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ssRedux } from "./Styles";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";

const Header = () => {
  console.log("Header - render...");
  const count = useSelector(selectCount);

  return (
    <View style={ssRedux.viewRow}>
      <Text>Header</Text>
      <Text style={ssRedux.textCounter}>{count}</Text>
    </View>
  );
};

export default Header;
