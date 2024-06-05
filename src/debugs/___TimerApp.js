import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

const TimerApp = () => {
  const counterRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      counterRef.current = window.setInterval(() => {
        setCounter(counter + 1);
      }, 30);
    } else {
      console.info(`Clear interval now!`);
      window.clearInterval(counterRef.current);
    }

    return () => {
      window.clearInterval(counterRef.current);
    };
  }, [start, counter]);

  return (
    <View style={styles.container}>
      <View style={styles.viewWrapper}>
        <Text>TimerApp</Text>
        <Text>{counter}</Text>

        <TouchableOpacity onPress={() => setStart(!start)}>
          <Text>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerApp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewWrapper: {
    backgroundColor: "white",
    width: "100%",
    height: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewFixed: {
    backgroundColor: "blue",
    width: "100%",
    height: 300,
    position: "absolute",
    top: 0,
    left: 100,
  },
});
