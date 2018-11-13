import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
export default props => {
  const { navigator, screen, tip, ime, boje, text } = props;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={boje}
      style={{ borderRadius: 25 }}
    >
      <Button
        style={{ backgroundColor: "transparent" }}
        rounded
        onPress={() => navigator.push({ screen })}
      >
        <Icon type={tip} name={ime} />
        <Text>{text}</Text>
      </Button>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15
  }
});
