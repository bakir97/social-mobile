import axios from "axios";
export const poruka = poruka => ({
  type: "CHAT",
  payload: poruka
});
export const posaljiNovuPoruku = podaci => async dispatch => {
  try {
    const proba = await axios.post("http://192.168.0.14:5001/Poruke", podaci);
    console.log(proba);
  } catch (error) {
    console.log(error);
  }
};
export const dohvatiPoruke = id => async dispatch => {
  try {
    const proba = await axios.get(`http://192.168.0.14:5001/Poruke/${id}`);
    const poruke = proba.data;
    console.log(poruke);

    dispatch(poruka(proba.data));
  } catch (error) {
    console.log(error);
  }
};
export const novaPoruka = poruka => ({
  type: "NOVA_PORUKA",
  payload: poruka
});
export const trenutniRazgovor = trenutni => ({
  type: "TRENUTNI",
  payload: trenutni
});
export const starePoruke = (id, skip) => async dispatch => {
  dispatch({ type: "LOADING_PORUKE", payload: true });
  try {
    const proba = await axios.get(
      `http://192.168.0.14:5001/Poruke/${id}/${skip}`
    );
    dispatch({
      type: "STARE_PORUKE",
      payload: proba.data
    });
  } catch (error) {
    dispatch({ type: "LOADING_PORUKE", payload: false });

    console.log(error);
  }
};
