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

  // Get the query string as an object
  const queryStringObject = parsedURL.query;

  // Get the method
  const method = req.method.toLowerCase();

  // Send response
  res.end('Hi there!');

  // Log the request
  console.log(
    `Request is received on this path ${trimmedPath} with method ${method}`,
  );
  console.log(queryStringObject);
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});
