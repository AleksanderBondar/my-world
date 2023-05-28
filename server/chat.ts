import { Socket } from 'socket.io';

import { Message } from '../types/ChatTypes.js';
import { Room } from '../types/RoomTypes.js';
import { User } from '../types/UserTypes.js';
import { makeRecordsFromMap, uniqueId } from './utils.js';

export const ChatManager = ({
    client,
    users,
    messages,
}: {
    client: Socket;
    users: Map<string, User>;
    messages: Map<string, Message>;
    rooms: Map<string, Room>;
}) => {
    client.on('message', ({ message, room }) => {
        const user = users.get(client.id);
        if (user) {
            const messageObject = {
                socketOwnerID: client.id,
                username: user.username,
                message,
            };

            messages.set(uniqueId('message'), messageObject);
            client.to(room).emit('newMessage', messageObject);
            client.emit('message', makeRecordsFromMap(messages));
            client.to(room).emit('message', makeRecordsFromMap(messages));
        }
    });
};
