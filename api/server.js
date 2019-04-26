const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const server = express();

const routes = require('./routes/routes.js');

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use(express.json());

routes(server)

module.exports = server;