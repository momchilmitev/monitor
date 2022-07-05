/**
 * Primary file for the API
 * 
 */

// Dependencies
import { createServer } from 'http';
import { StringDecoder } from 'string_decoder';
import router from './router.js';
import { notFound } from './routeHandlers.js';

// Creating the http server
const httpServer = createServer((req, res) => {
  // Get the URL and parse it
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  // Get the path
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

  // Getting the search params as an object
  const serachParams = parsedUrl.searchParams;

  // Getting the request headers as an object
  const headers = req.headers;

  // Get the http method
  const method = req.method.toLowerCase();

  // Get the payload if any
  const decoder = new StringDecoder('utf-8');
  let payload = '';
  
  req.on('data', chunk => payload += decoder.write(chunk))

  req.on('end', () => {
    payload += decoder.end()

    // Constructing the data object
    const data = {
      headers,
      method,
      path,
      payload,
      serachParams,
    }

    // Getting the coresponding route handler
    const handler = typeof(router[path]) !== 'undefined' ? router[path] : notFound

    // Routing the request
    handler(data, (statusCode = 200, payload = {}) => {
      // Covert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString)

      // Log the status code and the payload string
      console.log(statusCode, payloadString);
    });
  })
});

// Starting the server
httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});