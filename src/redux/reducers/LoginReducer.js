import { ERROR, KORISNIK } from "../actions/actionsConstants";
const initialState = {
  isAuth: false,
  podaci: {},
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case KORISNIK:
      return {
        ...state,
        podaci: action.payload,
        isAuth: Object.keys(action.payload).length > 0
      };
    case ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
