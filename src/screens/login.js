import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TabsNavigation from "../tabs/tabs";
import TextInput from "../inputs/textInput";
import { Field, reduxForm } from "redux-form";
import { KorisnikPodaci } from "../redux/actions/loginActions";
import App from "../../App";
import { conect } from "../sockets/sockets";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text
} from "native-base";
class Login extends Component {
  login = podaci => {
    this.props.KorisnikPodaci(podaci);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      let prvi = false;
      if (nextProps.username === this.props.username) {
        return;
      }
      if (nextProps.username && !prvi) {
        console.log(prvi);

        console.log("logiiinnnnn", nextProps.username);

        prvi = nextProps.username;
        conect(nextProps.username);
      }
      TabsNavigation();
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { errorLogin } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.forma}>
          <Field
            noviError={errorLogin.username ? errorLogin.username : null}
            text="Username"
            name="username"
            tip="Entypo"
            ime="user"
            component={TextInput}
          />
        </View>
        <Field
          noviError={errorLogin.password ? errorLogin.password : null}
          text="Password"
          name="password"
          tip="Entypo"
          ime="key"
          passwordSecure
          component={TextInput}
        />
        <Button
          onPress={this.props.handleSubmit(this.login)}
          transparent
          iconLeft
          style={{ margin: 20, alignSelf: "center" }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "Kalam-Regular",
              color: "#304352"
            }}
          >
            Login
          </Text>
        </Button>
      </View>
      // <View style={styles.container}>
      //   <View style={styles.forma}>
      //     <View>
      //       <Field name="username" component={TextInput} />
      //     </View>
      //     <View>
      //       <Field
      //         labelText="Password"
      //         name="password"
      //         component={PasswordInput}
      //       />
      //     </View>

      //     <Button
      //       title="Login"
      //       color="green"
      //       onPress={this.props.handleSubmit(this.login)}
      //     />
      //   </View>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  forma: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  login: state.Login.isAuth,
  username: state.Login.podaci.username,
  errorLogin: state.Login.error
});

const mapDispatchToProps = {
  KorisnikPodaci
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "login" })(Login));
