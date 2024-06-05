import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ssRedux } from "./Styles";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";

const Footer = () => {
  console.log("Footer - render...");
  const count = useSelector(selectCount);
  return (
    <View style={ssRedux.viewRow}>
      <Text>Footer</Text>
      <Text style={ssRedux.textCounter}>{count}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
