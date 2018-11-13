import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import TextInput from "../../inputs/textInput";
import { Field, reduxForm } from "redux-form";
import ImagePicker from "react-native-image-crop-picker";
import RoundedButton from "../../layout/Buttons/RoundedButtonAction";
import { azurirajProfil, uspjesno } from "../../redux/actions/ProfilActions";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Text,
  Thumbnail,
  Root,
  Toast
} from "native-base";
import UploadUtil from "../NovaObjava/UploadUtil";
class Login extends Component {
  state = {
    profilnaSlika: this.props.profil.profilnaSlika
  };

  submit = async podaci => {
    let podaciUpload = { ...podaci };
    if (typeof this.state.profilnaSlika === "string") {
      podaciUpload.profilnaSlika = this.state.profilnaSlika;
    } else {
      podaciUpload.profilnaSlika = await UploadUtil(this.state.profilnaSlika);
    }
    console.log(podaciUpload, "podaci");
    this.props.azurirajProfil(podaciUpload);
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uspjesnoState &&
      nextProps.uspjesnoState !== this.props.uspjesnoState
    ) {
      console.log("component wil lrecive props");

      Toast.show({
        text: "Upsjesno ste azurirali profil",
        buttonText: "Okay",
        type: "success",
        duration: 5000,
        onClose: () => this.props.uspjesno(false)
      });
    }
  }
  proba = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        cropperCircleOverlay: true,
        cropping: true
      });

      let pathParts = image.path.split("/");

      const podaci = {
        uri: image.path,
        name: pathParts[pathParts.length - 1],
        type: image.mime
      };

      this.setState(prevState => ({ profilnaSlika: podaci }));
      console.log(podaci, "podaci");
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { errorLogin } = this.props;
    const { profilnaSlika } = this.state;
    console.log(this.state.profilnaSlika, "profilna Slika mater ti");

    return (
      <Root>
        <Container>
          <Content contentContainerStyle={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {profilnaSlika ? (
                <TouchableOpacity onPress={this.proba}>
                  <Thumbnail
                    large
                    source={{ uri: profilnaSlika.uri || profilnaSlika }}
                  />
                </TouchableOpacity>
              ) : (
                <Fragment>
                  <Text>Izaberi sliku</Text>
                  <TouchableOpacity onPress={this.proba}>
                    <Icon
                      type="Entypo"
                      name="image"
                      style={{ color: "green" }}
                    />
                  </TouchableOpacity>
                </Fragment>
              )}
            </View>
            <View style={styles.forma}>
              <Field
                noviError={errorLogin.username ? errorLogin.username : null}
                text="Ime"
                name="ime"
                tip="Entypo"
                ime="user"
                component={TextInput}
              />
            </View>
            <View style={styles.forma}>
              <Field
                noviError={errorLogin.username ? errorLogin.username : null}
                text="Prezime"
                name="prezime"
                tip="Entypo"
                ime="user"
                component={TextInput}
              />
            </View>
            <View style={styles.forma}>
              <Field
                noviError={errorLogin.username ? errorLogin.username : null}
                text="Grad"
                name="grad"
                tip="MaterialIcons"
                ime="location-city"
                component={TextInput}
              />
            </View>
            <View style={styles.forma}>
              <Field
                noviError={errorLogin.username ? errorLogin.username : null}
                text="Instagram"
                name="instagram"
                tip="Entypo"
                ime="instagram-with-circle"
                component={TextInput}
              />
            </View>
            <View style={styles.forma}>
              <Field
                noviError={errorLogin.username ? errorLogin.username : null}
                text="Opis"
                name="opis"
                tip="Entypo"
                ime="user"
                component={TextInput}
              />
            </View>

            <RoundedButton
              tip="MaterialIcons"
              ime="update"
              text="Azuriraj Profil"
              boje={["#348F50", "#56B4D3"]}
              akcija={this.props.handleSubmit(this.submit)}
            />
          </Content>
        </Container>
      </Root>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
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
  errorLogin: state.Login.error,
  profil: state.Profil.profil,
  initialValues: state.Profil.profil,
  uspjesnoState: state.Profil.uspjesno
});

const mapDispatchToProps = { azurirajProfil, uspjesno };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: "profil",
    destroyOnUnmount: false,
    enableReinitialize: true
  })(Login)
);
