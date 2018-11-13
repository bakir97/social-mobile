import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "native-base";
import { logout } from "../../redux/actions/loginActions";
import { connect } from "react-redux";
class DugmeLogout extends Component {
  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={() => this.props.logout()}>
          <Icon type="Entypo" name="log-out" />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DugmeLogout);
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 100,
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
