import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Container, Content } from "native-base";
import { TouchableOpacity } from "react-native";
import RoundedButton from "../Buttons/RoundedButtonAction";
export default class Modal extends Component {
  componentDidMount() {
    console.log("====================================");
    console.log(this.props.reset, "reset");
    console.log("====================================");
  }
  resetObjavu = () => {
    this.props.reset();
    this.props.navigator.dismissLightBox();
  };
  prebaci = () => {
    this.props.reset();
    this.props.navigator.dismissLightBox();
    this.props.navigator.switchToTab({
      tabIndex: 1
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.marginNaSve, { fontSize: 30 }]}>
          Upsjesno ste objavili objavu
        </Text>
        <View style={styles.marginNaSve}>
          <RoundedButton
            akcija={this.resetObjavu}
            tip="Feather"
            ime="plus"
            text="Napisi novu Objavu"
            boje={["#00F260", "#0575E6"]}
          />
        </View>

        <Text style={styles.marginNaSve}>Ili</Text>

        <View style={styles.marginNaSve}>
          <RoundedButton
            akcija={this.prebaci}
            tip="Feather"
            ime="plus"
            text="Pogledaj Svoje objave"
            boje={["#00F260", "#0575E6"]}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 10
  },
  marginNaSve: {
    margin: 10
  }
});
