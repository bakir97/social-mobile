const initialState = {
  poruke: [],
  trenutni: null,
  loading: false,
  onlineKorisnici: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHAT":
      return { ...state, poruke: action.payload };
    case "NOVA_PORUKA":
      return { ...state, poruke: [action.payload, ...state.poruke] };
    case "TRENUTNI":
      return { ...state, trenutni: action.payload };
    case "STARE_PORUKE":
      return {
        ...state,
        poruke: state.poruke.concat(action.payload),
        loading: false
      };
    case "ONLINE_KORISNICI":
      return { ...state, onlineKorisnici: action.payload };

    case "LOADING_PORUKE":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
