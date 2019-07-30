const request = require('supertest');
const server = require('../../server');


module.exports = request(server)