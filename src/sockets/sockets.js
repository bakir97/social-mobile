import io from "socket.io-client";
export const socket = io("http://192.168.0.14:5001/", { forceNew: true });
export const posaljiPoruku = poruka => {
  socket.emit("novaPoruka", poruka);
};
export const disconect = () => {
  socket.close();
};

export const conect = username => {
  socket.open();

  // socket.emit("poruka", username);

  // socket.on("novaPorukaServer", poruka => {
  //   console.log(store.getState());
  //   console.log(poruka, "poruka socket");

  //   dispatch({ type: "NOVA_PORUKA", payload: poruka });
  // });
  socket.emit("poruka", username);
};
export default (store, username) => {
  socket.on("connect", () => {});
  socket.on("onlineKorisnici", korisnici => {
    store.dispatch({
      type: "ONLINE_KORISNICI",
      payload: korisnici
    });
    console.log("online koirnisci", korisnici);
  });

  socket.on("novaPorukaServer", poruka => {
    const korisnik = store.getState().Chat.trenutni;
    console.log(store.getState());
    console.log(poruka, "poruka socket");

    if (korisnik === poruka.user.name) {
      store.dispatch({ type: "NOVA_PORUKA", payload: poruka });
      return;
    }
    console.log("nova poruka");
  });
};
