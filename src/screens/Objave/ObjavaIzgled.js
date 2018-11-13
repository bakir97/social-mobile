import React, { Component } from "react";
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Image } from "react-native";
import moment from "moment";
import "moment/locale/bs";
import { TouchableOpacity } from "react-native";
import NoImage from "../../../assets/no-image-icon-.png";
export default class componentName extends Component {
  state = {
    kliknuto: false
  };
  componentDidMount() {
    moment.locale("bs");
  }
  omiljena = () => {
    this.props.omiljenaObjava(this.props.id);
    this.setState(prevState => ({ kliknuto: !prevState.kliknuto }));
  };
  componentDidUpdate() {
    console.log(this.props.createdAt, "datum");
  }

  render() {
    const {
      naslovnaSlika,
      naslov,
      createdAt,
      profilnaSlika,
      username,
      prebaciNaObjavu,
      id
    } = this.props;

    return (
      //   let sumChars = 0;
      // for (let i = 0; i < userName.length; i += 1) {
      //   sumChars += userName.charCodeAt(i);
      // }

      // // inspired by https://github.com/wbinnssmith/react-user-avatar
      // // colors from https://flatuicolors.com/
      // const colors = [carrot, emerald, peterRiver, wisteria, alizarin, turquoise, midnightBlue];

      // this.avatarColor = colors[sumChars % colors.length];
      <Card>
        <CardItem>
          <Left>
            {profilnaSlika ? (
              <Thumbnail
                source={{
                  uri: `${profilnaSlika}`
                }}
              />
            ) : (
              <Thumbnail source={NoImage} />
            )}

            <Body>
              <Text>{username}</Text>
            </Body>
          </Left>
          <Right>
            <Text>{moment(createdAt).format("L")}</Text>
          </Right>
        </CardItem>
        <CardItem cardBody style={{ flexDirection: "column" }}>
          <Image
            source={{
              uri: `${naslovnaSlika}`
            }}
            style={{ height: 150, width: "100%", flex: 1 }}
          />
          <Text>{naslov}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <TouchableOpacity onPress={this.omiljena}>
              {this.state.kliknuto ? (
                <Icon
                  active
                  type="FontAwesome"
                  name="heart"
                  style={{ fontSize: 40, color: "red" }}
                />
              ) : (
                <Icon
                  active
                  type="FontAwesome"
                  name="heart-o"
                  style={{ fontSize: 35, color: "black" }}
                />
              )}
            </TouchableOpacity>
          </Left>

          <Right>
            <TouchableOpacity onPress={prebaciNaObjavu(id)}>
              <Text style={{ color: "#2c3e50", fontSize: 20 }}>
                Read More...
              </Text>
            </TouchableOpacity>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
