import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ss } from "../../styles/Styles";

let loops = 0;
const BWUseEffectApp = () => {
  console.log("BWUseEffectApp - render loop: ", loops++);
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    console.log("useEffect[] 1");
  }, []);

  useEffect(() => {
    console.log("useEffect[date]");
  }, [date]);

  // ORDER IS IMPORTANT
  useEffect(() => {
    console.log("useEffect[date, month]");
  }, [date, month]);
  useEffect(() => {
    console.log("useEffect[year]");
  }, [year]);

  useEffect(() => {
    console.log("useEffect[] 2");
  }, []);

  useEffect(() => {
    console.log("useEffect[hour] ----------- x");
    setMinute((m) => m + 1);
    setMinute((m) => m + 1);

    setYear((y) => y + 1);
    setYear((y) => y + 1);

    setMonth((m) => m + 1);
  }, [hour]);

  console.log("BWUseEffectApp - render 2");
  return (
    <View style={ss.viewFull}>
      <Text>BWUseEffectApp</Text>
      <TouchableOpacity style={ss.buttonBlue} onPress={() => setDate(date + 1)}>
        <Text style={ss.textGreen}> count date </Text>
      </TouchableOpacity>
      <TouchableOpacity style={ss.button} onPress={() => setDate(date + 1)}>
        <Text style={ss.textTeal}> count date&month </Text>
      </TouchableOpacity>

      <TouchableOpacity style={ss.button} onPress={() => setHour(hour + 1)}>
        <Text style={ss.textTeal}>hour & minute</Text>
      </TouchableOpacity>

      <Text>hour:{hour}</Text>
      <Text>minute:{minute}</Text>
      <Text>year: {minute}</Text>
      <Text>month: {month}</Text>
    </View>
  );
};

export default BWUseEffectApp;

const styles = StyleSheet.create({});
