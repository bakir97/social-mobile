import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../../inputs/textInput";
import { Container, Content, Text, Button } from "native-base";
import {
  createValidator,
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthLessThan,
  isNumeric,
  hasLengthGreaterThan,
  matchesField
} from "revalidate";
import { registracija } from "../../redux/actions/signUpActions";
import OpacityDugme from "../../layout/Buttons/OpacityDugme";

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const customIsRequired = isRequired({ message: "Required" });

const validate = combineValidators({
  username: composeValidators(
    isRequired("username"),
    hasLengthGreaterThan(5)({
      message: "mora sadrzavati vise od 5 znakova"
    })
  )(),
  password: composeValidators(
    isRequired("Password"),
    hasLengthGreaterThan(5)({
      message: "mora sadrzavati vise od 5 znakova"
    })
  )(),
  secretKey: composeValidators(
    isRequired("secretKey"),
    hasLengthGreaterThan(5)({
      message: "mora sadrzavati vise od 5 znakova"
    })
  )(),
  confirmPassword: matchesField("password")({
    message: "Passwords do not match"
  }),
  email: composeValidators(customIsRequired, isValidEmail)()
});

class SignUp extends Component {
  registracija = podaci => {
    this.props.registracija(podaci, this.props.navigator);
  };
  render() {
    const { username, email } = this.props.errorSignUp;
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Field
            provjera
            noviError={username ? username : null}
            tip="Entypo"
            ime="user"
            text="Username"
            name="username"
            component={TextInput}
          />
          <Field
            provjera
            noviError={email ? email : null}
            tip="Entypo"
            ime="email"
            text="Email"
            name="email"
            component={TextInput}
          />
          <Field
            provjera
            tip="MaterialCommunityIcons"
            ime="account-key"
            text="Secret"
            name="secretKey"
            component={TextInput}
          />
          <Field
            provjera
            tip="Entypo"
            ime="key"
            text="Password"
            name="password"
            component={TextInput}
            passwordSecure
          />
          <Field
            provjera
            tip="Entypo"
            ime="key"
            text="Confirm Password"
            name="confirmPassword"
            component={TextInput}
            passwordSecure
          />
          <OpacityDugme
            disabled={this.props.invalid || this.props.pristine ? true : false}
            funkcija={this.props.handleSubmit(this.registracija)}
            text="Registruj se"
            stilText={{ color: "#304352", fontSize: 30 }}
          >
            <Text>Sign Up</Text>
          </OpacityDugme>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  errorSignUp: state.SignUp.errors
});

const mapDispatchToProps = {
  registracija
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "signup", validate })(SignUp));
