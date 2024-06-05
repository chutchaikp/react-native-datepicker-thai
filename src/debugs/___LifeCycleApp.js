import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const lx = (str) => {
  console.log(str);
};

// interesting
const LifeCycleApp = () => {
  console.info("");
  console.info(`render 1 => show: ${show} other: ${other} `);

  const expensive = () => {
    let num = 0;
    for (let index = 0; index < 100000010; index++) {
      const element = 1000000;
      num = index + 1;
    }
  };

  // interesting
  // now working if useEffect is above useState like this
  // useEffect(() => {
  //   expensive();
  //   lx(`useEffect[show] show: ${show}`);
  // }, [show]);

  const [show, setShow] = useState(() => {
    expensive();
    lx("===> useState show");
    return false;
  });

  useEffect(() => {
    expensive();
    lx(`useEffect[show] show: ${show}`);
  }, [show]);

  const [other, setOther] = useState(() => {
    expensive();
    lx("===> useState other");
    return "other";
  });

  useEffect(() => {
    expensive();
    lx("useEffect[]");
  }, []);

  console.info(`render 2 => show: ${show} other: ${other} `);

  return (
    <View style={styles.container}>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <Text>LifeCycleApp</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShow(!show)}>
        <Text style={styles.text}>show/hide</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShow((prev) => !prev)}
      >
        <Text style={styles.text}>show/hide</Text>
      </TouchableOpacity>

      <View style={{ ...styles.viewFixed, display: show ? "block" : "none" }}>
        <Text>hello</Text>
      </View>

      {/* {show === true && <Text>xxxx</Text>} */}
    </View>
  );
};

export default LifeCycleApp;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#1f1f1f39",
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewFixed: {
    backgroundColor: "#a752fb",
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
    // left: 100,
  },
  button: {
    backgroundColor: "#00a494",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});
