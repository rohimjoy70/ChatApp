import { io } from "socket.io-client";

//! untuk di halaman chatnya

const socket = io("http://localhost:3000/", {
   auth: {
      username: localStorage.username,
   },
   autoConnect: false,
});

export default socket;
