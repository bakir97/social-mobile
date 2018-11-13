const initialState = {
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ERROR_REGISTRACIJA":
      return { ...state, errors: action.payload };

    default:
      return state;
  }
};
