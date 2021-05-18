/*
 * Primary file for the api
 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

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

  // Get the headers
  const headersObject = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // Send response
    res.end('Hi there!');

    // Log the request
    console.log(
      `Request is received on this path ${trimmedPath} with method ${method}`,
    );
    console.log(queryStringObject);
    console.log(headersObject);
    console.log(buffer);
  });
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});
