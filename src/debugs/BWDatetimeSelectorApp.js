import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ss } from "../styles/Styles";
import BWTimeModal from "./BWTimeModal";
import BWDateModal from "./BWDateModal";

const BWDatetimeSelectorApp = () => {
  return (
    <View style={ss.viewCenter}>
      <Text>BWDatetimeSelectorApp</Text>

      <View style={ss.viewColumn}>
        <BWDateModal />
        <BWTimeModal />
        {/* <BWDateModal /> */}
        {/* <View style={{ backgroundColor: "yellow" }}>
          <BWDateModal />
          <BWTimeModal />
        </View> */}
      </View>
    </View>
  );
};

export default BWDatetimeSelectorApp;

// const styles = StyleSheet.create({});
