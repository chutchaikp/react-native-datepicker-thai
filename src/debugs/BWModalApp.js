import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BWModal from "./BWModal";

const BWModalApp = () => {
  console.log("BWModalApp - render");

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text>BWModalApp</Text>
        <Text>BWModalApp</Text>
        <Text>BWModalApp</Text>
        <Text>BWModalApp</Text>
      </View>

      <View style={styles.viewRow}>
        <BWModal />
        <BWModal />
        <BWModal />
      </View>
    </View>
  );
};

export default BWModalApp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    display: "flex",
    justifyContent: "center",
    // backgroundColor: "blue",
    // position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  },
  wrapper: {
    width: 500,
  },
  viewRow: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    margin: 20,
    // position: "relative",
  },
});
