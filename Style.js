import { StyleSheet } from "react-native";

export const ss = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
    // borderRadius: 10,
    backgroundColor: "#fff",
    // borderWidth: 3,
    // borderColor: "#02856b",
    borderWidth: 2,
    borderColor: "#666666",
    height: 40,
  },
  // button color: white: background: blue
  buttonBlue: {
    backgroundColor: "#0f53ff",
    // height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
    padding: 10,
  },
  textButton: {
    color: "#666",
    fontSize: 20,
  },
  textButtonBlue: {
    color: "#fff",
  },
  textGreen: {
    fontSize: 20,
    color: "#1f1f",
  },
  textPurple: {
    fontSize: 20,
    color: "#a1029c",
    fontWeight: "bold",
  },
  textTeal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#005d7f",
  },
  textBlue: {
    color: "#0f53ff",
    fontSize: 20,
  },
  viewRow: {
    display: "flex",
    flexDirection: "row",
  },
  viewColumn: {
    display: "flex",
    flexDirection: "column",
  },
  viewLog: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 55,
  },
});

// yarn add expo-status-bar@~1.6.0 react-native@0.72.10
