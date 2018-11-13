import { Navigation, Navigator } from "react-native-navigation";
import Login from "./src/screens/login";
import SignUp from "./src/screens/SignUp/SignUp";
import { configureStore } from "./src/redux/reduxConfig";
import { Provider } from "react-redux";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";
import Welcome from "./src/screens/Welcome/Welcome";
import Objave from "./src/screens/Objave/Objave";
import Razgovori from "./src/screens/Poruke/Razgovori";
import Poruke from "./src/screens/Poruke/Poruke";

import NovaObjava from "./src/screens/NovaObjava/NovaObjava";
import TabsNavigation from "./src/tabs/tabs";
import AuthAxios from "./src/util/authAxios";
import Proba from "./src/layout/modals/proba";
import Offline from "./src/screens/Offline/Ofline";
import { NetInfo, AppState } from "react-native";
import Profil from "./src/screens/Profil/Profil";
import { dohvatiProfil, profilAkcija } from "./src/redux/actions/ProfilActions";
import JednaObjava from "./src/screens/JednaObjava/JednaObjava";
import Dugme from "./src/screens/Dugme/LogoutDugme";
import Logo from "./src/tabs/Logo";
import Sockets, { conect, socket, ponovo } from "./src/sockets/sockets";

const store = configureStore();
// let prvi = false;
// if (!prvi) {
//   store.subscribe(() => {
//     const username = store.getState().Login.podaci.username;
//     console.log("reduxxxxxxx");
//     if (username && !prvi) {
//       prvi = true;
//       Sockets(store, username);
//     }
//   });
// }

// AsyncStorage.getItem("jwt").then(token => {
//   // let jednom = false;
//   console.log(token, "reduxxx");

//   if (!token) {
//     console.log("od reduxaa");

//     store.subscribe(() => {
//       const username = store.getState().Login.podaci.username;
//       if (username) {
//         console.log(username, "reduxxxxxxx");
//         // jednom = true;
//         Sockets(store, username);
//       }
//     });
//   }
// });
Sockets(store);
let trenutno = false;
AppState.addEventListener("change", next => {
  if (next === "active" && trenutno === "background") {
    console.log("====================================");
    console.log(socket.connected);
    console.log("====================================");
  } else {
    trenutno = next;
  }
});
AsyncStorage.getItem("jwt").then(token => {
  console.log(token);
  if (token) {
    AuthAxios(token);
    const dekodirano = jwt_decode(token);
    console.log(dekodirano, "dekodirano");
    conect(dekodirano.username);
    store.dispatch({ type: "KORISNIK", payload: dekodirano });
    AsyncStorage.getItem("profil").then(profil => {
      if (profil) {
        store.dispatch(profilAkcija(JSON.parse(profil)));
      } else {
        store.dispatch(dohvatiProfil());
      }
    });
    TabsNavigation();
  } else {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "vjezba.Welcome",

        navigatorStyle: {
          navBarHidden: true
        }
      },
      animationType: "none"
    });
  }
});

// function handleFirstConnectivityChange(isConnected) {
//   AsyncStorage.getItem("jwt").then(token => {
//     if (token) {
//       AuthAxios(token);
//       const dekodirano = jwt_decode(token);
//       store.dispatch({ type: "KORISNIK", payload: dekodirano });
//       AsyncStorage.getItem("profil").then(profil => {
//         if (profil) {
//           store.dispatch(profilAkcija(JSON.parse(profil)));
//         } else {
//           store.dispatch(dohvatiProfil());
//         }
//       });
//       Sockets(store, dekodirano.username);
//       TabsNavigation();
//     } else {
//       Navigation.startSingleScreenApp({
//         screen: {
//           screen: "vjezba.Welcome",
//           navigatorStyle: {
//             navBarHidden: true
//           }
//         }
//       });
//     }
//   });
//   if (!isConnected) {
//     Navigation.startSingleScreenApp({
//       screen: {
//         screen: "vjezba.Offline"
//       }
//     });
//   }
// }
// NetInfo.isConnected.addEventListener(
//   "connectionChange",
//   handleFirstConnectivityChange
// );

Navigation.registerComponent("vjezba.Login", () => Login, store, Provider);
Navigation.registerComponent("vjezba.Profil", () => Profil, store, Provider);
Navigation.registerComponent("vjezba.SignUp", () => SignUp, store, Provider);
Navigation.registerComponent("vjezba.Welcome", () => Welcome, store, Provider);
Navigation.registerComponent("vjezba.Objave", () => Objave, store, Provider);
Navigation.registerComponent("vjezba.Poruke", () => Poruke, store, Provider);
Navigation.registerComponent(
  "vjezba.Razgovori",
  () => Razgovori,
  store,
  Provider
);

Navigation.registerComponent("vjezba.Proba", () => Proba, store, Provider);
Navigation.registerComponent("vjezba.Dugme", () => Dugme, store, Provider);
Navigation.registerComponent("vjezba.Logo", () => Logo, store, Provider);

Navigation.registerComponent(
  "vjezba.JednaObjava",
  () => JednaObjava,
  store,
  Provider
);

Navigation.registerComponent("vjezba.Offline", () => Offline);
Navigation.registerComponent(
  "vjezba.NovaObjava",
  () => NovaObjava,
  store,
  Provider
);
