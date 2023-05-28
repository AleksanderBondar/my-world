import fs from 'fs';
import express from 'express';
import Router from 'express-promise-router';
import { Server } from 'socket.io';

const router = Router();
router.get('/', async (_, res) => {
    let html = fs.readFileSync('./client/index.html', 'utf-8');
    res.send(html);
});
router.use('*', (_, res) => {
    res.status(404).send({ message: 'Not Found' });
});

const app = express();
app.use(express.static('dist'));
app.use(router);
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port http://localhost:3000...`);
});

const ioServer = new Server(server);

ioServer.on('connection', client => {
    console.log(`User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`);

    client.on('disconnect', () => {
        console.log(
            `User ${client.id} disconnected, there are currently ${ioServer.engine.clientsCount} users connected`,
        );
    });
});
