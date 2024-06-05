import { StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";

const BWSwitch = () => {
  const [enable, setEnable] = useState(false);

  const toggleSwitch = () => setEnable((previousState) => !previousState);

  return (
    <View>
      <Text>BWSwitch</Text>

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={enable ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setEnable((previousState) => !previousState)}
        value={enable}
      />
    </View>
  );
};

export default BWSwitch;

const styles = StyleSheet.create({});
