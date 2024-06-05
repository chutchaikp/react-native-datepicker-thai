import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";

const BWRefs = () => {
	const textinputRef = useRef(null);
	cosnt handlePress = () => {
		textinputRef.current.set
	}
  return (
    <View>
      <Text>BWRefs</Text>

			<TouchableOpacity onPress={handlePress}>
				<Text>click</Text>
			</TouchableOpacity>

			<TextInput ref={textinputRef} />
			<TextInput />
    </View>
  );
};

export default BWRefs;

const styles = StyleSheet.create({});
