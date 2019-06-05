const SocketIO = require('socket.io');

let io;
let log;

const init = ({ httpServer, logger }) => {
  io = SocketIO(httpServer);
  log = logger;
};

const createNamespace = (name) => {
  log.info(`Creating namespace for ${name}`);
  const nsp = io.of(`/sessions/${name}`);
  nsp.on('connection', (socket) => {
    log.info(`Someone has joined ${name}`);

    nsp.emit('hi', 'hello');

    socket.on('vote placed', (data) => {
      log.info(`Incoming Vote: ${JSON.stringify(data)}`);
      nsp.emit('vote accepted', data);
    });
  });
};

module.exports = {
  init,
  createNamespace,
};
