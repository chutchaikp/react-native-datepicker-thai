import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ss } from "../styles/Styles";
import { _info } from "../utils/utils.js";
import { _log } from "../utils/utils.js";

let loop = 0;

const LifeCycle2App = () => {
  _info(``);
  _log(`============> loop: ${loop++}`);
  _info(` render - counter:  ${counter} `);

  const [counter, setCounter] = useState(0);
  useEffect(() => {
    _info(` useEffect[] - counter:  ${counter} `);

    // window.setTimeout(() => {
    //   console.log("timeout 1");
    //   setCounter(counter + 1);
    // }, 100);

    // window.setTimeout(() => {
    //   console.log("timeout 2");
    //   setCounter(counter + 2);
    // }, 200);

    // window.setTimeout(() => {
    //   console.log("timeout 3");
    //   setCounter(counter + 3);
    // }, 300);
  }, []);

  useEffect(() => {
    _info(` useEffect[counter] - counter:  ${counter} `);
  }, [counter]);

  _info(` render 2 - counter:  ${counter} `);

  return (
    <View style={ss.viewFull}>
      <Text>{counter} </Text>
      <TouchableOpacity
        style={ss.buttonBlue}
        onPress={() => setCounter(counter + 1)}
      >
        <Text style={ss.textButtonBlue}>count </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LifeCycle2App;
