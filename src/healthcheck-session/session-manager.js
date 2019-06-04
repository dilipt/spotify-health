const SocketIO = require('socket.io');

const SessionManager = ({ httpServer, sessionStore, log }) => {
  const io = SocketIO(httpServer);

  io.on('connection', (socket) => {
    log.info(socket.request);

    socket.on('vote_submitted', (data) => {
      log.info(`Incoming Vote: ${JSON.stringify(data)}`);
      io.emit('record vote', data);
    });
  });
};

module.exports = {
  SessionManager,
};
