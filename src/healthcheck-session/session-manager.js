const SocketIO = require('socket.io');

const SessionManager = ({ httpServer, sessionStore, log }) => {
  const serverSocket = SocketIO(httpServer);

  serverSocket.on('connection', (socket) => {
    log.info(socket.request);
  });
};

module.exports = {
  SessionManager,
};
