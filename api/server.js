const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const routes = require('./routes/routes.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

routes(server)

module.exports = server;