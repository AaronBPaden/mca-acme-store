"use strict";
import express from 'express';
const server = express();

import helmet from 'helmet';
import cors from 'cors'

import router from './app/routes/router.js';
import ServerConfig from './app/config/ServerConfig.js';

server.use(helmet());
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
server.use('/', router);

server.listen(ServerConfig.PORT, ServerConfig.HOST, () => console.log(`Listening on ${ServerConfig.HOST}:${ServerConfig.PORT}. Welcome to ACME Corp.!`));
