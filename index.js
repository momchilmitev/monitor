/*
 * Primary file for the api
 */

// Dependencies
const http = require('http');
const url = require('url');

// Creating the server
const server = http.createServer((req, res) => {
  // Get the URL and parse it
  const parsedURL = url.parse(req.url, true);

  // Get the path
  const path = parsedURL.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Send response
  res.end('Hi there!');

  // Log the request  path
  console.log(`Request is received on this path ${trimmedPath}`);
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});