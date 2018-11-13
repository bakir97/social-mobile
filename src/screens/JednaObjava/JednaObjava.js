import React, { Component } from "react";
import { Container, Content, Item, Text, Header, H3 } from "native-base";
import { StyleSheet, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { dohvatiJednuObjavu } from "../../redux/actions/ObjaveActions";
import Proba from "../../src/index";
class JednaObjava extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.reset);
  }
  componentDidMount() {
    console.log("componentmount");

    this.props.dohvatiJednuObjavu(this.props.id);
  }
  reset = e => {
    if (e.id === "willDisappear") {
      this.props.navigator.pop();
    }
  };

  render() {
    const { slike, naslov, text } = this.props.objava;
    return (
      <Container>
        <Content
          contentContainerStyle={{
            alignItems: "center",
            flex: 1
          }}
        >
          <ScrollView style={{ flex: 1, width: "100%" }}>
            <View>
              <H3>{naslov}</H3>
              {slike && <Proba data={slike} />}
            </View>
            <View style={{ width: "100%" }}>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>

              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>

              <Text>{text}</Text>
              <Text>{text}</Text>

              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>

              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
              <Text>{text}</Text>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = state => ({
  objava: state.Objave.jednaObjava
});

const mapDispatchToProps = {
  dohvatiJednuObjavu
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JednaObjava);
