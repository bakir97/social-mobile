import axios from "axios";
import { SUCCESS } from "./actionsConstants";
import { reset } from "redux-form";
export const novaObjava = podaci => async dispatch => {
  try {
    dispatch({
      type: "LOADING"
    });
    const objava = await axios.post("http://192.168.0.14:5001/objave", podaci);

    dispatch(success(objava.data));
    dispatch(reset("novaobjava"));
  } catch (error) {
    dispatch(success({}));
  }
};
export const success = podaci => ({
  type: SUCCESS,
  payload: podaci
});
export const dohvatiObjave = () => async dispatch => {
  try {
    const objave = await axios.get("http://192.168.0.14:5001/objave");
    console.log(objave.data);

    dispatch(Objave(objave.data));
  } catch (error) {
    console.log(error.response.data);
  }
};
export const Objave = podaci => ({
  type: "DOHVATI_OBJAVE",
  payload: podaci
});
export const dohvatiJednuObjavu = id => async dispatch => {
  try {
    const objava = await axios.get(
      `http://192.168.0.14:5001/objave/jednaObjava/${id}`
    );
    console.log(objava, "objavaaa");

    dispatch(Objava(objava.data));
  } catch (error) {
    console.log(error);
  }
};
export const omiljeneObjave = id => async dispatch => {
  try {
    console.log(id, "id");

    const omiljenaObjava = await axios.post(
      `http://192.168.0.14:5001/Profil/omiljenaObjava/${id}`
    );
    console.log(omiljenaObjava, "objavaaa");

    dispatch(Objava(omiljenaObjava.data));
  } catch (error) {
    console.log(error);
  }
};
export const dohvatiOmiljeneObjave = () => async dispatch => {
  try {
    const objava = await axios.get(`http://192.168.0.14:5001/Profil/omiljena`);
    console.log(objava, "objavaaa");

    dispatch(Objava(objava.data));
  } catch (error) {
    console.log(error);
  }
};
export const Objava = objava => ({
  type: "JEDNA_OBJAVA",
  payload: objava
});
