/*
 * Primary file for the api
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const { readFileSync } = require('fs');
const config = require('./config.js');
const _data = require('./lib/data.js');

// Testing the storing data functionality
_data.read('test', 'newFile', (err, data) => console.log(err, data));

// Creating the http server
const httpServer = http.createServer((req, res) => {
  unifiedServer(req, res);
});

// Starting the http server
httpServer.listen(config.httpPort, () => {
  console.log(
    `Server is listening on port ${config.httpPort} in ${config.envName} mode!`,
  );
});

// Creating the https sever
const httpsServerOptions = {
  key: readFileSync('./https/key.pem'),
  cert: readFileSync('./https/cert.pem'),
};

const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
  unifiedServer(req, res);
});

// Starting the https server
httpsServer.listen(config.httpsPort, () => {
  console.log(
    `Server is listening on port ${config.httpsPort} in ${config.envName} mode!`,
  );
});

// The main server logic
function unifiedServer(req, res) {
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
}

// Define handlers
const handlers = {};

// Define ping handler
handlers.ping = function (data, callback) {
  // Callback http status and payload object
  callback(200);
};

// Define not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Defining a router
const router = {
  ping: handlers.ping,
};
