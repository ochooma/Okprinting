require('dotenv').config();
const {client}= require('./lib/wit');
const {interactive} = require('node-wit');
interactive(client);
