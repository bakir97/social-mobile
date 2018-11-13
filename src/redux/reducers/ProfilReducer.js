const initialState = {
  profil: {},
  uspjesno: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "PROFIL":
      return { ...state, profil: action.payload };
    case "USPJESNO":
      return { ...state, uspjesno: action.payload };
    default:
      return state;
  }
};
