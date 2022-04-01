import { Server } from 'socket.io';
import { Op } from 'sequelize';
import { UserModel } from '../models/user.model.js';
import { messages } from '../models/messages.model.js';
import { conversation } from '../models/conversation.model.js';


const io = new Server();

export class SocketIo {

    startSocket(http) {
        this.io = new Server(http, {
            cors: {
                origin: '*',
                methods: ["GET", "POST"]
            }
        });

        const users = {};

        this.io.on('connection', (socket) => {

            console.log('new user in socketasdf');
            // const onlineUsers = await UserModel.findAll({ where: { online: 1 } });
            // this.io.emit('new-user-online', onlineUsers);
            // socket.broadcast.emit('new-user-online', onlineUsers);

            socket.on('login', async(user) => {
                console.log('new user logged', user);
                await UserModel.update({ socket_id: socket.id, online: 1 }, { where: { id: user.id } });
                const onlineUsers = await UserModel.findAll({ where: { online: 1 } });
                this.io.emit('new-user-online', onlineUsers);
                socket.broadcast.emit('new-user-online', onlineUsers);

            });

            //localStorage.getItem  ("ingresado");


            socket.on('update', async(user) => {
                const onlineUsers = await UserModel.findAll({ where: { online: 1 } });
                this.io.emit('update-Users', onlineUsers);
                socket.broadcast.emit('update-Users', onlineUsers);

            });

            // function updateUsers(socket) {
            //     this.io.emit('update-Users', onlineUsers);
            //     socket.broadcast.emit('update-Users', onlineUsers);
            // }

            // socket.on('update-users', async(user) => {

            //     this.io.emit('updateUsers', onlineUsers);
            //     socket.broadcast.emit('updateUsers', onlineUsers);

            // });

            socket.on('new-message', async(data) => {
                console.log('incoming data', data);
                const msgs = await messages.findOne({ where: { conversation_uuid: data.uuid, id: data.id } });
                const conv = await conversation.findOne({ where: { uuid: data.uuid, from_id: data.from_id } });
                const user = await UserModel.findOne({ where: { id: conv.to_id } });

                // console.log('user to send', user);
                this.io.to(user.socket_id).emit('new-message', msgs);
                socket.broadcast.to()
            });


            socket.on('disconnect', async() => {
                console.log('user disconnected', socket.id);
                await UserModel.update({ socket_id: socket.id, online: 1 }, { where: { socket_id: socket.id } });
                const onlineUsers = await UserModel.findAll({ where: { online: 1, socket_id: socket.id } });
                this.io.emit('new-user-online', onlineUsers);
                socket.broadcast.emit('new-user-online', onlineUsers);
            });
        });
    }
}