import express from 'express';
import { userController } from '../controllers/user.controller.js';

export class Routes {

    routes(app = express.application) {

        app.get('/', (req, res) => {
            res.send("Hola Mundo!");
        });

        app.post('/say-hello', userController.sayHello);
        app.post('/get-users', userController.getUsers);
        app.post('/api/login', userController.getUsers);
        app.post('/api/create-user', userController.createUser);

        app.post('/api/load-conversation', userController.loadConversation);
        app.post('/api/save-message', userController.saveMessage);


        app.post('/data', (req, res) => {
            const data = req.body;
            console.log('data from front', data);

            for (let i in data.books) {
                console.log('Libros leidos -> ', data.books[i].name);
            }

            res.json({
                ok: true,
                message: 'data recieved'
            });
        });

    }
}