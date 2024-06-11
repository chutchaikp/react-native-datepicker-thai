import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientApp = () => {
  return (
    <View style={styles.App}>
      <Text>GradientApp</Text>

      <View style={styles.container}>
        {/* <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={styles.background}
        /> */}
        <LinearGradient
          // Button Linear Gradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.button}
        >
          <Text style={styles.text}>Sign in with Facebook</Text>
        </LinearGradient>

        {/* #732229 */}
        {/* #4D2424 */}
        {/* #2F2729 */}
        {/* start={[0, 0]}
          end={[1, 0]} */}

        <LinearGradient
          colors={["#732229", "#4D2424", "#2F2729"]}
          start={[0, 0]}
          end={[0, 1]}
          style={styles.button}
        >
          <LinearGradient
            colors={["#717070", "#2A2325", "#272727"]}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.buttonInner}
          >
            <Text style={styles.text}>Sign in with Facebook</Text>
          </LinearGradient>
        </LinearGradient>
      </View>
    </View>
  );
};

export default GradientApp;

const styles = StyleSheet.create({
  App: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
    width: 200,
    height: 80,
    borderRadius: 200,
    padding: 0,
  },
  buttonInner: {
    width: 170,
    height: 66,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
  },

  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    color: "#fff",
  },
});
