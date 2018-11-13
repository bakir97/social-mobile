import React, { Component, Fragment } from "react";
import {
  Container,
  Content,
  Item,
  Footer,
  Button,
  Text,
  Thumbnail,
  Icon,
  Toast,
  Root,
  Spinner
} from "native-base";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextAreaObjava from "../../inputs/TextArea";
import TextInput from "../../inputs/textInput";
import RoundedButton from "../../layout/Buttons/RoundedButtonAction";
import ImagePicker from "react-native-image-crop-picker";
import UploadUtil from "./UploadUtil";
import { novaObjava, success } from "../../redux/actions/ObjaveActions";
class NovaObjava extends Component {
  state = {
    slike: [],
    profilnaSlika: null
  };

  proba = async profilna => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        multiple: true
      });

      if (profilna === "profil") {
        let pathParts = image[0].path.split("/");

        const podaci = {
          uri: image[0].path,
          name: pathParts[pathParts.length - 1],
          type: image[0].mime
        };
        this.setState(prevState => ({ profilnaSlika: podaci }));
        return;
      } else {
        image.map(image => {
          let pathParts = image.path.split("/");
          const podaci = {
            uri: image.path,
            name: pathParts[pathParts.length - 1],
            type: image.mime
          };
          this.setState(prevState => ({
            slike: prevState.slike.concat(podaci)
          }));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  submit = async p => {
    const NaslovnaSlika = await UploadUtil(this.state.profilnaSlika);
    const slikeOstale = await this.state.slike.map(async slika => {
      const novaSlika = await UploadUtil(slika);
      return novaSlika;
    });
    Promise.all(slikeOstale).then(rezult => {
      const podaci = {};
      podaci.naslov = p.naslov;
      podaci.text = p.text;
      podaci.naslovnaSlika = NaslovnaSlika;
      podaci.slike = rezult;
      podaci.profilId = this.props.profilId;
      this.props.novaObjava(podaci);
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.objave.success) {
      this.setState({ slike: [], profilnaSlika: null }, () => {});
      this.props.navigator.showLightBox({
        screen: "vjezba.Proba", // unique ID registered with Navigation.registerScreen,
        passProps: {
          reset: () => this.props.success({})
        },
        style: {
          backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
          backgroundColor: "rgba(0,0,0,0.5)" // tint color for the background, you can specify alpha here (optional)
        },
        adjustSoftInput: "resize" // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
      });
    }
  }
  render() {
    const { slike, profilnaSlika } = this.state;
    const { loading } = this.props.objave;

    return (
      <Root>
        <Container>
          <Content contentContainerStyle={styles.container}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={{ width: "70%" }}>
                <Field
                  name="naslov"
                  component={TextInput}
                  text="Upisi Naslov Objave"
                />
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {profilnaSlika ? (
                  <TouchableOpacity onPress={() => this.proba("profil")}>
                    <Thumbnail
                      style={{ marginLeft: 40, marginTop: 10 }}
                      source={{ uri: profilnaSlika.uri }}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text>Izaberi sliku</Text>
                    <TouchableOpacity onPress={() => this.proba("profil")}>
                      <Icon
                        type="Entypo"
                        name="image"
                        style={{ color: "green" }}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            <View style={{ width: "95%", marginTop: 20 }}>
              <Field
                name="text"
                component={TextAreaObjava}
                text="Napisi novu Objavu"
              />
            </View>
            <View style={{ flexDirection: "row", margin: 10 }}>
              {slike.map((slika, i) => (
                <Thumbnail
                  style={{ marginLeft: 10 }}
                  key={i}
                  square
                  source={{ uri: slika.uri }}
                />
              ))}
            </View>

            <View style={{ marginBottom: 10 }}>
              <Button transparent success onPress={this.proba}>
                <Text>Dodaj Slike</Text>
                <Icon type="Entypo" name="images" />
              </Button>
            </View>
            <View>
              {loading ? (
                <Spinner color="green" />
              ) : (
                <RoundedButton
                  tip="Feather"
                  ime="plus"
                  text="Objavi"
                  boje={["#00F260", "#0575E6"]}
                  akcija={this.props.handleSubmit(this.submit)}
                />
              )}
            </View>
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
  }
});
const mapStateToProps = state => ({
  objave: state.Objave,
  profilId: state.Profil.profil._id
});

const mapDispatchToProps = {
  novaObjava,
  success
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "novaobjava" })(NovaObjava));
