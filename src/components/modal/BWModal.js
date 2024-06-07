import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ss } from "../../styles/Styles";

const BWModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        position: "relative",
        backgroundColor: "white",
        padding: 50,
        width: "100%",
        height: "100%",
      }}
    >
      <Text>BWModal</Text>
      <TouchableOpacity style={ss.button} onPress={() => setVisible(true)}>
        <Text style={ss.textResult}>show</Text>
      </TouchableOpacity>

      {/* <View
        style={{
          // ...StyleSheet.absoluteFillObject,
          position: "absolute",
          // left: 0,
          // right: 200,
          width: 300,
          left: 0,
          top: 0,
          bottom: 0,

          // apply elevation: 0 for component that covers component that you want to be on top (if shadow is not needed)
          // how it work

          zIndex: 1000,
          elevation: 0,

          margin: 10,
          padding: 20,
          backgroundColor: "#73d1f9",
          display: visible ? "flex" : "none",
        }}
      >
        <Vehicles onClose={() => setVisible(false)} />
      </View> */}

      <Modal visible={visible}>
        <Vehicles onClose={() => setVisible(false)} />
      </Modal>

      <Parent />
    </View>
  );
};

export default BWModal;

const styles = StyleSheet.create({
  modal: {
    // ..Stylesheet.absoluteFillObject,
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});

const Vehicles = ({ onClose }) => {
  console.log("Vehicle - render");
  const [counter, setCounter] = useState(13);

  useEffect(() => {
    console.log("Vehicle - useEffect[]");
    setCounter((c) => c + 1);
  }, []);

  console.log("Vehicle - render 2");
  return (
    <View style={{ flex: 1, margin: 50 }}>
      <Text>hello modal</Text>

      <TouchableOpacity
        style={ss.buttonBlue}
        onPress={() => setCounter((c) => c + 1)}
      >
        <Text style={ss.textButtonBlue}>{counter}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text>close</Text>
      </TouchableOpacity>
    </View>
  );
};

// TODO: move modal to the left or right

const Parent = () => {
  const modalRef = useRef(null);

  const [visible, setVisible] = useState(false);
  return (
    <View style={{ backgroundColor: "silver", position: "relative" }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text>show</Text>
      </TouchableOpacity>

      <View
        ref={modalRef}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          console.log("height:", layout.height);
          console.log("width:", layout.width);
          console.log("x:", layout.x);
          console.log("y:", layout.y);
          console.log(JSON.stringify(layout));
        }}
        style={{
          ...StyleSheet.absoluteFillObject,
          // position: "absolute",

          left: -60,
          right: 30,
          top: -90,
          bottom: 0,

          // TODO: get window dimension

          height: "100%",
          // flex: 1,

          // apply elevation: 0 for component that covers component that you want to be on top (if shadow is not needed)
          // how it work

          zIndex: 1000,
          elevation: 0,

          margin: 10,
          padding: 20,
          backgroundColor: "blue",
          display: visible ? "flex" : "none",
        }}
      >
        <Text>hello modal</Text>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Text>close</Text>
        </TouchableOpacity>

        <Text>hello modal</Text>
        <Text>hello modal</Text>
        <Text>hello modal</Text>
        <Text>hello modal</Text>
        <Text>hello modal</Text>
        <Text>hello modal</Text>
      </View>
      <Text>
        Parent Parent Parent Parent Parent Parent Parent Parent Parent Parent
        Parent Parent
      </Text>
      <Text>
        Parent Parent Parent Parent Parent Parent Parent Parent Parent Parent
        Parent Parent
      </Text>

      <Child />

      <Text>
        Parent Parent Parent Parent Parent Parent Parent Parent Parent Parent
        Parent Parent
      </Text>
    </View>
  );
};

const Child = () => {
  return (
    <View style={{ backgroundColor: "yellow" }}>
      <Text>Child Child Child Child Child Child Child Child Child Child</Text>
      <Text>Child Child Child Child Child Child Child Child Child Child</Text>
      <Text>Child Child Child Child Child Child Child Child Child Child</Text>
    </View>
  );
};
