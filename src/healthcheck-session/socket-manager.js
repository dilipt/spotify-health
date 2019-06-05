const SocketIO = require('socket.io');

let io;
let log;

const init = ({ httpServer, logger }) => {
  io = SocketIO(httpServer);
  log = logger;
};

const createNamespace = (name) => {
  const nsp = io.of(`/sessions/${name}`);
  nsp.on('connection', (socket) => {
    socket.on('vote placed', (data) => {
      nsp.emit('vote accepted', data);
    });
  });
};

module.exports = {
  init,
  createNamespace,
};
