"use strict";
import express from 'express';
import config from './config/config.js';
import router from './routes/router.js';

const server = express();
server.set('view engine', 'ejs');
server.use('/', router);

server.listen(config.PORT, config.HOST, () => console.log(`Listening on ${config.HOST}:${config.PORT}`));
