
'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  routes: {
    files: {
        relativeTo: Path.join(__dirname, '../db')
    }
  }
})

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: (request, h) => {
      return "Hello World !"
    }
  } 
})

exports.init = async () => {
  await server.initialize();
  return server;
}

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});