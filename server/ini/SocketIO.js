/* eslint-disable no-param-reassign */
let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server);
    // get online users count
    const users = [];

    io.on('connection', (socket) => {
      // const onlineUsers = io.engine.clientsCount;

      function updateOnlineUsers() {
        io.emit('onlineUsers', users);
      }
      // join rooms
      socket.on('userConnected', (user) => {
        // add user to array when connected to keep track of connected users
        socket.user = user;
        const exist = users.find(connected => connected.id === user.id);
        if (!exist) {
          users.push(user);
        }
        socket.join(user.id);
        // update online socket number
        updateOnlineUsers();
      });

      // disconnecting user
      socket.on('userDisconnected', () => {
        // loop through connected users to delete logged off user
        for (let i = 0; i < users.length; i += 1) {
          if (users[i].id === socket.user.id) {
            users.splice(i, 1);
          }
        }
        // update online socket number
        updateOnlineUsers();
      });
    });
    return io;
  },
  getSocket: () => {
    if (!io) {
      throw new Error('Socket.io was not initialized!');
    }
    return io;
  },
};
