/**
 * Primary file for the API
 * 
 */

// Dependencies
import http from 'http';

// Creating the http server
const httpServer = http.createServer((req, res) => {
  res.end('Hello Momo\n');
});

// Starting the server
httpServer.listen(3000, () => {
  console.log('Server is running on port 3000');
});