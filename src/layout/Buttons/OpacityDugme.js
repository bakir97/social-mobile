import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default ({ text, funkcija, stilContainer, stilText, ...ostalo }) => {
  return (
    <View style={[styles.container, stilContainer]}>
      <TouchableOpacity {...ostalo} onPress={funkcija && funkcija}>
        <Text style={[styles.text, stilText]}> {text} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 25,
    fontFamily: "Kalam-Regular"
  }
});
