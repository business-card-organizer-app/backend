const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const userRoute = require('./route/user');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json())
server.use(userRoute);

function error(err, req, res, next) {
    console.log(err)
    res.status(500).json(err)
};

server.use(error);

module.exports = server;