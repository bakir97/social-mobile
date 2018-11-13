import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";
import {
  Container,
  Content,
  Button,
  Header,
  Text,
  Item,
  Icon
} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import RoundedButton from "../../layout/Buttons/RoundedGradientButton";
import Login from "../login";
import OpacityDugme from "../../layout/Buttons/OpacityDugme";
export default class Welcome extends Component {
  state = {
    kreniAnim: new Animated.Value(0),
    zdravoAnim: new Animated.Value(0),
    OstaloAnim: new Animated.Value(0)
  };
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.kreniAnim, {
        toValue: 1,
        duration: 1000
      }),
      Animated.timing(this.state.zdravoAnim, {
        toValue: 1,
        duration: 1000
      }),
      Animated.timing(this.state.OstaloAnim, {
        toValue: 1,
        duration: 1000
      })
    ]).start();
  }
  render() {
    const { navigator } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <Animated.View
              style={{
                opacity: this.state.kreniAnim,
                top: this.state.kreniAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0]
                })
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontFamily: "Pacifico",
                  fontSize: 30,
                  marginRight: 10
                }}
              >
                Kreni
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                opacity: this.state.zdravoAnim,
                top: this.state.zdravoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0]
                })
              }}
            >
              <Text
                style={{
                  color: "#008C3C",
                  fontFamily: "Pacifico",
                  fontSize: 30
                }}
              >
                Zdravo
              </Text>
            </Animated.View>
          </View>
          <Animated.View
            style={{
              opacity: this.state.OstaloAnim,
              top: this.state.OstaloAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0]
              }),
              width: "100%",
              alignItems: "center",
              flex: 2
            }}
          >
            <Login />
            <View>
              <Text
                style={{
                  color: "#008C3C",
                  fontFamily: "Pacifico",
                  fontSize: 20
                }}
              >
                OR
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "center"
              }}
            >
              <OpacityDugme
                text="Registruj se"
                stilText={{ color: "#304352" }}
                funkcija={() => navigator.push({ screen: "vjezba.SignUp" })}
              />
              <OpacityDugme
                text="Login sa Google+"
                stilText={{ color: "#304352" }}
                funkcija={() => console.log("radi")}
              />
              <OpacityDugme
                text="Nastavi kao Gost"
                stilText={{ color: "#304352" }}
                funkcija={() => console.log("radi")}
              />
            </View>
          </Animated.View>
          {/* <View>
            <RoundedButton
              navigator={this.props.navigator}
              boje={["#2980B9", "#6DD5FA", "#2C5364"]}
              tip="SimpleLineIcons"
              ime="user"
              screen="vjezba.SignUp"
              text="Sign Up"
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>Login</Text>
            <RoundedButton
              navigator={this.props.navigator}
              boje={["#2980B9", "#6DD5FA", "#2C5364"]}
              tip="SimpleLineIcons"
              ime="user"
              screen="vjezba.Login"
              text="Login"
            />
          </View>

          <View>
            <Text>Login</Text>
            <RoundedButton
              navigator={this.props.navigator}
              boje={["#ED213A", "#93291E"]}
              tip="FontAwesome"
              ime="google-plus"
              screen="vjezba.Login"
              text="Google"
            />
          </View>
          <View>
            <Text>Login</Text>
            <RoundedButton
              navigator={this.props.navigator}
              boje={["#2980B9", "#6DD5FA", "#2C5364"]}
              tip="SimpleLineIcons"
              ime="user"
              screen="vjezba.Login"
            />
          </View> */}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15
  }
});
