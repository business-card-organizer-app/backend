const express = require('express');
const collectionCtr = require('../controller/collections');
const auth = require('../helpers/authenticat');
const userMidle = require('../middleware/users');
const collectionMidle = require('../middleware/collections');

const route = express.Router();

route.get('/api/user/:id/collection/:card_id', auth.authToken, auth.authUser, userMidle.validateId, collectionCtr.getCardCollection);
route.post('/api/user/:id/collection', auth.authToken, auth.authUser, userMidle.validateId, collectionMidle.validateCollection, collectionMidle.validateCollectionsType, collectionCtr.addCardCollection);
route.get('/api/user/:id/collection', auth.authToken, auth.authUser, userMidle.validateId, collectionCtr.getUserCollection);

module.exports = route;