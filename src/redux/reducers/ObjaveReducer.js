import { SUCCESS } from "../actions/actionsConstants";
const initialState = {
  loading: false,
  success: false,
  objave: [],
  jednaObjava: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        success: Object.keys(action.payload).length > 0,
        loading: false
      };
    case "LOADING":
      return { ...state, loading: true };

    case "DOHVATI_OBJAVE":
      return { ...state, objave: action.payload };
    case "JEDNA_OBJAVA":
      return { ...state, jednaObjava: action.payload };
    default:
      return state;
  }
};
