import { StyleSheet } from "react-native";

export const ss = StyleSheet.create({
  viewFull: {
    // flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  viewRow: {
    display: "flex",
    flexDirection: "row",
  },
  viewColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  viewCenter: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  viewLog: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 5,
  },
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
  textResult: {
    color: "#000000ff",
    fontSize: 20,
  },
});

export const ssModal = StyleSheet.create({
  modalComponent: {
    backgroundColor: "blue",
    // flex: 1,
    zIndex: 99,
    // position: "absolute",
  },
  modalContent: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "green",
  },
  centeredView: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#5958585e",
  },
  modalView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export const ssTime = StyleSheet.create({
  container: {
    // padding: 0,
    // margin: 0,
    // height: "100%",
    // width: "100%",
    backgroundColor: "red", // "#1f1f1f8a",
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    zIndex: 100,
  },
  wrapper: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "flex-end",
    // fix show line issue
    // width: "100%",
    // z Index: 1,
  },
  buttons: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: 300,
    backgroundColor: "white",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});

export const ssDate = StyleSheet.create({
  container: {
    // padding: 0,
    // margin: 0,
    backgroundColor: "red",
    // height: "100%",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // position: "absolute",
    // zIndex: 100,
    // left: 0,
    // top: 0,
  },
  wrapper: {
    // flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // alignItems: "flex-end",
    // fix show line issue
    // width: "100%",
    // z Index: 100,
    backgroundColor: "blue",
  },
  buttons: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonWrapper: {
    width: 300,
    backgroundColor: "white",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    width: 55,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "blue",
  },
  buttonText: {
    color: "blue",
    fontWeight: "700",
  },
  textResult: {
    color: "red",
    fontSize: 25,
  },
});