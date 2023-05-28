import { Socket } from 'socket.io';

import { makeRecordsFromMap } from './utils.js';
import { User } from '../types/UserTypes.js';
import { YunkAnimationData } from './develop.js';

export const PlayersManager = ({
    client,
    users,
    yunkAnimationData,
}: {
    client: Socket;
    users: Map<string, User>;
    yunkAnimationData: YunkAnimationData;
}) => {
    client.on('playerMove', ({ id, ...rest }) => {
        const currentUser = users.get(client.id);
        users.set(client.id, { ...currentUser, ...rest });
        const updatedRecords = makeRecordsFromMap(users);
        client.emit('playerMove', updatedRecords);
    });
    client.on('yunkAnimationSwap', ({ animationIndex }) => {
        yunkAnimationData.animationIndex = animationIndex;
        const currentUser = users.get(client.id);
        if (!currentUser) return;
        client.to(currentUser?.room).emit('yunkAnimationSwap', yunkAnimationData);
        client.emit('yunkAnimationSwap', yunkAnimationData);
    });
};
