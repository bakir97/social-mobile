import React from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";

import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage
} from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import CustomView from "./CustomView";
import { posaljiPoruku, socket } from "../../sockets/sockets";
import { connect } from "react-redux";
import {
  poruka,
  novaPoruka,
  posaljiNovuPoruku,
  dohvatiPoruke,
  trenutniRazgovor,
  starePoruke
} from "../../redux/actions/ChatAcions";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      skip: 10
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }
  componentDidMount() {
    this.props.dohvatiPoruke(this.props.RazgovorId);
    this.props.trenutniRazgovor(this.props.RazgovorUsername);
  }
  componentWillMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this.props.poruka([]);
    this.props.trenutniRazgovor(null);
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState(previousState => {
      return {
        skip: previousState.skip + 10
      };
    });
    console.log(this.state.skip);

    this.props.starePoruke(this.props.RazgovorId, this.state.skip);
  }

  onSend(messages = []) {
    console.log("moj id", this.props.mojId);
    console.log("njegov", this.props.RazgovorId);

    messages[0].korisnici = [this.props.RazgovorId, this.props.mojId];
    messages[0].usernameKomeSaljem = this.props.RazgovorUsername;
    messages[0].ProfiliId = [this.props.ProfilId, this.props.id];
    console.log(messages[0].ProfiliId);

    posaljiPoruku(messages[0]);
    this.props.novaPoruka(messages[0]);
    this.props.posaljiNovuPoruku(messages[0]);
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if (messages[0].image || messages[0].location || !this._isAlright) {
        this.setState(previousState => {
          return {
            typingText: "React Native is typing"
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive("Nice picture!");
          } else if (messages[0].location) {
            this.onReceive("My favorite place");
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive("Alright");
            }
          }
        }
      }

      this.setState(previousState => {
        return {
          typingText: null
        };
      });
    }, 1000);
  }

  onReceive(poruka) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, poruka)
      };
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === "ios") {
      return <CustomActions {...props} />;
    }
    const options = {
      "Action 1": props => {
        alert("option 1");
      },
      "Action 2": props => {
        alert("option 2");
      },
      Cancel: () => {}
    };
    return <Actions {...props} options={options} />;
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#f0f0f0"
          }
        }}
        textStyle={{
          right: {
            fontFamily: "Kalam-Regular",
            paddingTop: 5
          },
          left: {
            fontFamily: "Kalam-Regular",
            paddingTop: 5
          }
        }}
      />
    );
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  }

  renderCustomView(props) {
    return <CustomView {...props} />;
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>{this.state.typingText}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const { id, avatar, chat, username } = this.props;
    return (
      <GiftedChat
        textInputProps={{}}
        messages={chat}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.props.loading}
        user={{
          _id: id,
          avatar,
          name: username
        }}
        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderSystemMessage={this.renderSystemMessage}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
        locale="bs"
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: "#aaa"
  }
});
const mapStateToProps = state => ({
  id: state.Profil.profil._id,
  avatar: state.Profil.profil.profilnaSlika,
  chat: state.Chat.poruke,
  username: state.Login.podaci.username,
  mojId: state.Login.podaci.id,
  loading: state.Chat.loading
});

const mapDispatchToProps = {
  novaPoruka,
  posaljiNovuPoruku,
  dohvatiPoruke,
  poruka,
  trenutniRazgovor,
  starePoruke
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
