/**
 * Primary file for the API
 * 
 */

// Dependencies
import { createServer } from 'http';
import { StringDecoder } from 'string_decoder';

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

    // Send the response
    res.end('Hello Momo\n');

    // Log the request path
    console.log(payload);
  })
});

// Starting the server
httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});