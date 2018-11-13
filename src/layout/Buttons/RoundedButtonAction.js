import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
export default props => {
  const { navigator, screen, tip, ime, boje, text, akcija } = props;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={boje}
      style={{ borderRadius: 25 }}
    >
      <Button
        light
        transparent
        rounded
        onPress={akcija ? () => akcija() : null}
      >
        <Icon type={tip} name={ime} />
        <Text>{text}</Text>
      </Button>
    </LinearGradient>
  );
};
