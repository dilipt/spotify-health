const SocketIO = require('socket.io');

let io;
let log;
const namespaces = new Map();

const init = ({ httpServer, logger }) => {
  io = SocketIO(httpServer);
  log = logger;
};

const createNamespace = (name) => {
  const nsp = io.of(`/sessions/${name}`);
  namespaces[name] = nsp;
  nsp.on('connection', (socket) => {
    socket.on('vote placed', (data) => {
      nsp.emit('vote accepted', data);
    });
  });
};

const newParticipant = (namespaceId, participant) => {
  namespaces[namespaceId].emit('participant joined', {
    participant,
  });
};

module.exports = {
  init,
  createNamespace,
  newParticipant,
};
