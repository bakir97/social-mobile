import React, { Component } from "react";
import { Container, Header, Content } from "native-base";
import ObjavaIzgled from "./ObjavaIzgled";
import { connect } from "react-redux";
import {
  dohvatiObjave,
  omiljeneObjave,
  dohvatiOmiljeneObjave
} from "../../redux/actions/ObjaveActions";
import { FlatList } from "react-native";
class CardImageExample extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.proba);
  }
  proba = event => {
    console.log(event);

    if (event.id === "willAppear") {
      this.props.dohvatiObjave();
    }
  };
  prebaciNaObjavu = id => () => {
    console.log("radi");

    this.props.navigator.push({
      screen: "vjezba.JednaObjava",
      passProps: {
        id
      }
    });
  };
  componentDidMount() {
    this.props.dohvatiOmiljeneObjave();
  }
  omiljenaObjava = id => {
    this.props.omiljeneObjave(id);
  };
  render() {
    const { objave, profil } = this.props;
    console.log("====================================");
    console.log(objave, "objave");
    console.log("====================================");
    return (
      <Container>
        {objave.length > 0 && (
          <FlatList
            data={objave}
            renderItem={({ item }) => (
              <ObjavaIzgled
                datum={item.createdAt}
                naslov={item.naslov}
                naslovnaSlika={item.naslovnaSlika}
                profilnaSlika={item.korisnik.profilnaSlika}
                username={item.korisnik.korisnik.username}
                prebaciNaObjavu={this.prebaciNaObjavu}
                id={item._id}
                omiljenaObjava={this.omiljenaObjava}
                createdAt={item.createdAt}
              />
            )}
            keyExtractor={item => item._id}
          />
        )}
        <Content />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  objave: state.Objave.objave,
  profil: state.Profil.profil
});

const mapDispatchToProps = {
  dohvatiObjave,
  omiljeneObjave,
  dohvatiOmiljeneObjave
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardImageExample);
