const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const userRoute = require('./route/user');
const eventRoute = require('./route/event');
const cardRoute = require('./route/cards');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());
server.use(userRoute);
server.use(eventRoute);
server.use(cardRoute);

server.all('*', (req, res) => {
    res.status(404).json({
        message: "This endpoint doesn't exists"
    })
})

server.use(function errors(err, req, res, next) {
    res.status(500).json(err)
});


module.exports = server;