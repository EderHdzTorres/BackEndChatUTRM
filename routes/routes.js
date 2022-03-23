import express from 'express';
// import { Routes } from './routes/routes.js';
import { userController } from'../controllers/user.controller.js';

class routes {

    
    routes (app = express.application) {
        // Aquí se declaran todas las rutas del proyecto

        app.post('/say-hello', userController.sayHello);
        app.post('/get-users', userController.getUsers);
        app.post('/api/login', userController.getUsers);
        app.get('/say-hello', userController.sayHello);

        app.post('/api/create-user', userController.createUser);

        app.get( '/', ( req , res ) => {
            res.send("Hola Mundo!" ); 
        });
    }
}

export const Routes=new routes();