import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { ssRedux } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";
import { fetchUserData } from "../../redux/personSlice";
import { ss } from "../../styles/Styles";

const Footer = () => {
  console.log("Footer - render...");

  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.person);

  const count = useSelector(selectCount);

  useEffect(() => {
    console.log(JSON.stringify(data));
  }, [data]);

  const handleMe = () => {
    console.log("handleme");
    dispatch(fetchUserData());
  };

  return (
    <View style={ssRedux.viewRow}>
      {loading && (
        <View>
          <Text> Loading.. </Text>
        </View>
      )}

      {error && (
        <View>
          <Text>Error: {error} </Text>
        </View>
      )}

      <Text>Footer</Text>
      <Text style={ssRedux.textCounter}>{count}</Text>

      <TouchableOpacity style={ss.button} onPress={handleMe}>
        <Text>load</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
