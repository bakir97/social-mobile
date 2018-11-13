import axios from "axios";
import { AsyncStorage } from "react-native";
export const azurirajProfil = podaci => async dispatch => {
  try {
    const profil = await axios.post("http://192.168.0.14:5001/Profil", podaci);
    console.log(profil.data, "profil");
    AsyncStorage.setItem("profil", JSON.stringify(profil.data));
    dispatch(profilAkcija(profil.data));
    dispatch(uspjesno(true));
  } catch (error) {
    console.log(error.response.data);
  }
};
export const dohvatiProfil = () => async dispatch => {
  try {
    const profil = await axios.get("http://192.168.0.14:5001/Profil");
    dispatch(profilAkcija(profil.data));
    AsyncStorage.setItem("profil", JSON.stringify(profil.data));
  } catch (error) {
    console.log(error);

    console.log(error.response.data);
  }
};
export const profilAkcija = podaci => ({
  type: "PROFIL",
  payload: podaci
});
export const uspjesno = p => ({
  type: "USPJESNO",
  payload: p
});
