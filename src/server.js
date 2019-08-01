const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const userRoute = require('./route/user');
const eventRoute = require('./route/event');
const cardRoute = require('./route/cards');
const collectionRoute = require('./route/collections');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(cors());
server.use(express.json());
server.use(userRoute);
server.use(eventRoute);
server.use(cardRoute);
server.use(collectionRoute);

server.all('*', (req, res) => {
    res.status(404).json({
        message: "This endpoint doesn't exists"
    })
})

server.use(function errors(err, req, res, next) {
    if (err.http_code === 400) {
        return res.status(400).json({
            message: 'Invalid image type ensure image is either jpg or png'
        })
    }
    res.status(500).json(err)
});


module.exports = server;