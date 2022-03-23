import { Server } from 'socket.io';
import { Op } from 'sequelize'
import { UserModel } from '../models/user.model.js';

const io = new Server();

export class SocketIo {

    startSocket (http) {
        this.io = new Server(http, { cors: {
                 origin: '*', methods: ["GET", "POST"]
        }});

        const users={};

        this.io.on('connection', (socket) => {

            socket.on('login', async (user) => {
                await UserModel.update( {socket_id: socket.id, online: true}, { where: {id: user.id }});
                const onlineUsers = await UserModel.findAll( { where: { online: true } });
                this.io.emit('new-user-online', onlineUsers);
            });

             socket.on('disconnect', async () => {

                await UserModel.update( { socket_id: socket.id, online: false }, {where: { socket_id: socket.id } });

                const onlineUsers = await UserModel.findAll( {where: { online: true, socket_id: socket.id } });

                this.io.emit('new-user-online', onlineUsers);

             });
        });
    }
}