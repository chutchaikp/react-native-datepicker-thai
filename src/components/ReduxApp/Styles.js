import { StyleSheet } from "react-native";

export const ssRedux = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    backgroundColor: "white",
    height: "100%",
    padding: 20,
  },
  viewRow: {
    flex: 1,
    display: "flex",
    margin: 10,
    backgroundColor: "silver",
    gap: 5,
    padding: 10,
  },
  textCounter: {
    color: "#03b9b0",
    fontSize: 40,
  },
  button: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#02758f",
    color: "white",
  },
});
