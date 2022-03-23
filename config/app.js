import express from 'express'
import dotenv from 'dotenv';
import http from 'http';
import { Routes } from '../routes/routes.js';
import { Database } from './database.js';

import { SocketIo } from '../socket/socket.js';
import { Server } from 'socket.io';

dotenv.config();
class App {

    app = express.application;

    // routes = new Routes();

    db = new Database();

    socket = new SocketIo();
    Http = null;


    constructor() {
        this.initializeApp();
    }
    async initializeApp() {
        this.app = express();
        this.config();

        this.Http = http.createServer(this.app);

        await this.database();
        // this.routes.routes(this.app);
        Routes.routes(this.app);

        this.socket.startSocket(this.Http);
    }
    config() {
        this.app.use(
            express.urlencoded({
                extended: true
            }));
        this.app.use(express.json())
    }

    async database() {
        let connection = await this.db.connection();
        console.log(connection.message)
    }
}

export default new App();