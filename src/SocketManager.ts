import SocketIO from 'socket.io';
import Logger from 'bunyan';

interface SocketManager {
  createNamespace: (name: string) => void
  newParticipant: (namespaceId: string, participant: any) => void
}

export const SocketManagerImpl = (httpServer: any, log: Logger): SocketManager => {
  const namespaces = new Map();
  const io = SocketIO(httpServer);

  const createNamespace = (name: string): void => {
    const nsp = io.of(`/sessions/${name}`);
    namespaces[name] = nsp;
    nsp.on('connection', (socket) => {
      socket.on('vote placed', (data) => {
        nsp.emit('vote accepted', data);
      });
    });
  };

  const newParticipant = (namespaceId: string, participant: any) => {
    namespaces[namespaceId].emit('participant joined', {
      participant,
    });
  }

  return {
    createNamespace,
    newParticipant,
  };
};
