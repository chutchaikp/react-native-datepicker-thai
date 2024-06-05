import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import moment from "moment";

const BWMoment = () => {
  useEffect(() => {}, []);

  const handleHello = () => {
    const m = moment().utcOffset(7 * 60);
    m.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    console.log("toISOString", m.toISOString());
    console.log("format", m.format());
    console.log("utc().format()", m.utc().format());
  };

  const handleHello2 = () => {
    const m = moment("2024-06-04T17:00:00.000Z");
    const mValid = moment("2024-06-04T17:00:00.000Z").isValid();
    console.log(`mValid: ${mValid === true ? "true" : "false"}`);
    console.log("m.toISOString", m.toISOString());
    console.log("m.format()", m.format());
    console.log("m.utc().format()", m.utc().format());
    console.info("");
    const n = moment("2024-06-04T17:00:00Z");
    const nValid = moment("2024-06-04T17:00:00").isValid();
    console.log(`nValid: ${nValid === true ? "true" : "false"}`);
    console.log("n.toISOString", n.toISOString());
    console.log("n.format()", n.format());
    console.log("n.utc().format()", n.utc().format());
  };

  return (
    <View style={styles.container}>
      <Text>BWMoment</Text>
      <TouchableOpacity onPress={handleHello}>
        <Text>Hello</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleHello2}>
        <Text>Hello 2</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BWMoment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "stretch",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
});
