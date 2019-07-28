const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());


function error(err, req, res, next) {
    res.status(500).json(err)
};

server.use(error);

module.exports = server;