const express = require('express');
const helmet = require('helmet');

const carsRouter = require('../cars/carsRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carsRouter);

// server.get('/', (req, res) => {
// 	res.send('Cars');
// });
module.exports = server;
