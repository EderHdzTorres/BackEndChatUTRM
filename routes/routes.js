import express from 'express';
// import { Routes } from './routes/routes.js';
import { userController } from'../controllers/user.controller.js';

class routes {

    
    routes (app = express.application) {
        // Aquí se declaran todas las rutas del proyecto

        app.get('/say-hello', userController.sayHello);

        app.get('/get-users', userController.getusers);

        app.get( '/', ( req , res ) => {
            res.send("Hola Mundo!" ); 
        });
    }
}

export const Routes=new routes();