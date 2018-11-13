import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Text
} from "native-base";
import { View } from "react-native";
export default class HeaderIconButtonTextButtonExample extends Component {
  render() {
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            color: "black",
            fontFamily: "Pacifico",
            marginRight: 10,
            fontSize: 25
          }}
        >
          Kreni
        </Text>
        <Text
          style={{
            color: "#008C3C",
            fontFamily: "Pacifico",
            fontSize: 25
          }}
        >
          Zdravo
        </Text>
      </View>
    );
  }
}
