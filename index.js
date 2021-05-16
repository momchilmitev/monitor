/*
 * Primary file for the api
 */

// Dependencies
const http = require('http');

// Creating the server
const server = http.createServer((req, res) => {
  res.end('Hi there!');
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});
