import fs from 'fs';
import express from 'express';
import Router from 'express-promise-router';
import { createServer } from 'vite';
import viteConfig from '../vite.config.js';
import { Server } from 'socket.io';
import { Room } from '../types/RoomTypes.js';
import { User } from '../types/UserTypes.js';
import { Message } from '../types/ChatTypes.js';
import { log } from './message.js';
import { ChatManager } from './chat.js';
import { PlayersManager } from './players.js';
import { makeRecordsFromMap } from './utils.js';

const router = Router();
const vite = await createServer({
    configFile: false,
    server: {
        middlewareMode: true,
    },
    ...viteConfig,
});

router.get('/', async (req, res, _) => {
    let html = fs.readFileSync('./client/index.html', 'utf-8');
    html = await vite.transformIndexHtml(req.url, html);
    res.send(html);
});

router.use(vite.middlewares);
router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const app = express();
app.use(router);
const server = app.listen(3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});

const ioServer = new Server(server, {
    cors: {
        origin: '*',
    },
});

const users = new Map<string, User>();
const messages = new Map<string, Message>();
const rooms = new Map<string, Room>();

export type YunkAnimationData = {
    animationIndex: number;
};

let serverStarted = false;

let yunkAnimationData: YunkAnimationData = {
    animationIndex: 0,
};

const emptyUserCoords: Omit<User, 'username'> = {
    room: 'main',
    position: {
        x: 0,
        y: 5,
        z: 0,
    },
    rotation: {
        isEuler: true,
        _x: 0,
        _y: 0,
        _z: 0,
        _order: 'XYZ',
    },
};

ioServer.on('connection', client => {
    if (!serverStarted) {
        log({
            message: 'Server started !',
            color: 'green',
        });
        rooms.set('main', {
            users: {},
        });
        serverStarted = true;
    }
    client.on('playerJoin', username => {
        log({
            message: 'New user !',
            fromClient: true,
            color: 'magenta',
        });
        const user: User = {
            username,
            ...emptyUserCoords,
        };
        users.set(client.id, user);
        const usersRecord = makeRecordsFromMap(users);
        const messagesRecord = makeRecordsFromMap(messages);
        client.join('main');
        client.emit('playerJoin', {
            users: usersRecord,
            messages: messagesRecord,
            animationsData: {
                yunkAnimationData,
            },
        });
    });

    PlayersManager({ client, users, yunkAnimationData });
    ChatManager({ client, users, messages, rooms });

    client.on('disconnect', () => {
        users.delete(client.id);
    });
});
