import React, { Component } from "react";
import {
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Body,
  Left,
  Thumbnail,
  Right,
  Badge
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import axios from "axios";
class Razgovori extends Component {
  state = {
    razgovori: [],
    korisnici: []
  };
  async componentDidMount() {
    try {
      const razgovori = await axios.get(
        "http://192.168.0.14:5001/Poruke/razgovori"
      );
      console.log(razgovori, "razgovori");

      this.setState({
        razgovori: razgovori.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  loadOstale = async () => {
    try {
      const korisnici = await axios.get(
        "http://192.168.0.14:5001/Poruke/korisnici"
      );
      console.log(korisnici, "razgovori");

      this.setState({
        korisnici: korisnici.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const proba = true;
    return (
      <Container>
        <Content>
          <List style={{ marginBottom: 50 }}>
            {this.state.razgovori.map(razgovori => {
              const imeDrugogKorisnika = razgovori.korisniciUsername.filter(
                korisnikUsername => korisnikUsername !== this.props.mojUsername
              )[0];
              const idDrugog = razgovori.korisnici.filter(
                id => id !== this.props.mojId
              )[0];
              const profilSlika = razgovori.ProfiliId.filter(
                id => id._id !== this.props.ProfilId
              );
              console.log(profilSlika);

              if (
                this.props.online.filter(ime => ime === imeDrugogKorisnika)
                  .length > 0
              ) {
                return (
                  <ListItem
                    key={razgovori._id}
                    button
                    onPress={() =>
                      this.props.navigator.push({
                        screen: "vjezba.Poruke",
                        passProps: {
                          RazgovorId: idDrugog,
                          RazgovorUsername: imeDrugogKorisnika
                        }
                      })
                    }
                    avatar
                  >
                    <Left>
                      {profilSlika.length > 0 && (
                        <Thumbnail
                          source={{
                            uri: profilSlika[0].profilnaSlika
                          }}
                        />
                      )}
                    </Left>
                    <Body>
                      <Text>{imeDrugogKorisnika}</Text>
                      <Text note>{razgovori.poruke[0].text}</Text>
                    </Body>
                    <Left>
                      <Badge success>
                        <Text>Online</Text>
                      </Badge>
                    </Left>
                  </ListItem>
                  // <Button
                  //   key={razgovori._id}
                  // onPress={() =>
                  //   this.props.navigator.push({
                  //     screen: "vjezba.Poruke",
                  //     passProps: {
                  //       RazgovorId: razgovori._id,
                  //       RazgovorUsername: razgovori.username
                  //     }
                  //   })
                  // }
                  // >
                  //   <Text>{razgovori.username} Online je </Text>
                  // </Button>
                );
              }
              return (
                <ListItem
                  key={razgovori._id}
                  button
                  onPress={() =>
                    this.props.navigator.push({
                      screen: "vjezba.Poruke",
                      passProps: {
                        RazgovorId: idDrugog,
                        RazgovorUsername: imeDrugogKorisnika
                      }
                    })
                  }
                  avatar
                >
                  <Left>
                    {profilSlika.length > 0 && (
                      <Thumbnail
                        source={{
                          uri: profilSlika[0].profilnaSlika
                        }}
                      />
                    )}
                  </Left>
                  <Body>
                    <Text>{imeDrugogKorisnika}</Text>
                    <Text note>{razgovori.poruke[0].text}</Text>
                  </Body>
                  <Left>
                    <Badge danger>
                      <Text>Offline</Text>
                    </Badge>
                  </Left>
                </ListItem>
              );
            })}
          </List>
          {this.state.korisnici.length < 1 ? (
            <Button onPress={() => this.loadOstale()} block light>
              <Text>Pogledaj Sve Korisnike</Text>
            </Button>
          ) : (
            <List>
              {this.state.korisnici.map(korisnik => {
                return (
                  <ListItem
                    key={korisnik._id}
                    button
                    onPress={() =>
                      this.props.navigator.push({
                        screen: "vjezba.Poruke",
                        passProps: {
                          RazgovorId: korisnik.korisnik._id,
                          RazgovorUsername: korisnik.korisnik.username,
                          ProfilId: korisnik._id
                        }
                      })
                    }
                    avatar
                  >
                    <Left>
                      <Thumbnail
                        source={{
                          uri: korisnik.profilnaSlika
                        }}
                      />
                    </Left>
                    <Body>
                      <Text>{korisnik.korisnik.username}</Text>
                    </Body>
                    <Left>
                      {this.props.online.filter(
                        ime => ime === korisnik.korisnik.username
                      ).length > 0 ? (
                        <Badge success>
                          <Text>Online</Text>
                        </Badge>
                      ) : (
                        <Badge danger>
                          <Text>Offline</Text>
                        </Badge>
                      )}
                    </Left>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => ({
  online: state.Chat.onlineKorisnici,
  mojId: state.Login.podaci.id,
  mojUsername: state.Login.podaci.username,
  ProfilId: state.Profil.profil._id
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Razgovori);
