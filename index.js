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

    // Choosing the right handler
    const handler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    // Constructing the data object needed for the handler
    const data = {
      path: trimmedPath,
      query: queryStringObject,
      method,
      headers: headersObject,
      payload: buffer,
    };

    // Route the request
    handler(data, (statusCode = 200, payload = {}) => {
      // Convert the payload into string
      const payloadString = JSON.stringify(payload);

      // Send response
      res.setHeader('Context-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request
      console.log(statusCode, payloadString);
    });
  });
});

// Starting the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000!');
});

// Define handlers
const handlers = {};

// Define sample handler
handlers.sample = function (data, callback) {
  // Callback http status and payload object
  callback(406, { name: 'sample payload' });
};

// Define not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Defining a router
const router = {
  sample: handlers.sample,
};
