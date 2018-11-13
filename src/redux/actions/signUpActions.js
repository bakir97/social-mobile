import axios from "axios";
import { Navigation } from "react-native-navigation";
export const registracija = (podaci, navigation) => async dispatch => {
  try {
    const registrovan = await axios.post(
      "http://192.168.0.14:5001/signUp",
      podaci
    );
    if (registrovan) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: "vjezba.Welcome",
          navigatorStyle: {
            navBarHidden: true
          }
        }
      });
    }
  } catch (error) {
    dispatch({
      type: "ERROR_REGISTRACIJA",
      payload: error.response.data
    });
  }
};
