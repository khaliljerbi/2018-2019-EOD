import openSocket from 'socket.io-client';

let io;
export default {
  init: () => {
    io = openSocket(`${process.env.REACT_APP_HOST_IP}`, { secure: true });
    return io;
  },
  getSocket: () => {
    if (!io) return new Error('no client socket found');
    // remove all listeners to avoid duplicate events
    io.removeAllListeners(['fiche_init']);
    return io;
  },
};
