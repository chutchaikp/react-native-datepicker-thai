import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ssRedux } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, selectCount } from "../../redux/counterSlice";

const ReduxApp = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <View style={ssRedux.container}>
      <Header />
      <View style={ssRedux.viewRow}>
        <Text>ReduxApp</Text>
        <Text>Redux Example</Text>
        <Text style={ssRedux.textCounter}>Count: {count}</Text>

        <Button
          color={"#019199"}
          // style={ssRedux.button}
          title="Increment"
          onPress={() => dispatch(increment())}
        />

        <Button
          style={ssRedux.button}
          title="Decrement"
          onPress={() => dispatch(decrement())}
        />
      </View>
      <Footer />
    </View>
  );
};

export default ReduxApp;

// const styles = StyleSheet.create({
//   container: {
//     alignSelf: "stretch",
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     backgroundColor: "white",
//     height: "100%",
//     padding: 20,
//   },
//   viewRow: {
//     flex: 1,
//     display: "flex",
//   },
// });
