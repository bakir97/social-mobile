import axios from "axios";
import AuthAxios from "../../util/authAxios";
import { KORISNIK, ERROR } from "./actionsConstants";
import jwt_decode from "jwt-decode";
import { AsyncStorage } from "react-native";
import { dohvatiProfil } from "./ProfilActions";
import { Navigation } from "react-native-navigation";
import { disconect } from "../../sockets/sockets";

export const KorisnikPodaci = podaci => async dispatch => {
  try {
    const podatak = await axios.post("http://192.168.0.14:5001/login", podaci);
    AuthAxios(podatak.data.token);
    const dekodirano = jwt_decode(podatak.data.token);
    AsyncStorage.setItem("jwt", podatak.data.token);
    dispatch(Korisnik(dekodirano));
    if (podatak.data.token) {
      dispatch(dohvatiProfil());
      dispatch(ErrorLogin({}));
    }
  } catch (error) {
    dispatch(ErrorLogin(error.response.data));
  }
};
export const Korisnik = podaci => ({
  type: KORISNIK,
  payload: podaci
});
export const ErrorLogin = error => ({
  type: ERROR,
  payload: error
});
export const logout = () => async dispatch => {
  AsyncStorage.removeItem("jwt");
  AsyncStorage.removeItem("profil");
  dispatch(Korisnik({}));
  dispatch({
    type: "PROFIL",
    payload: {}
  });
  disconect();
  Navigation.startSingleScreenApp({
    screen: {
      screen: "vjezba.Welcome",
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};
