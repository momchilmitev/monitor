/**
 * The file containing all the route handlers for the router
 * 
 */

const sample = (data, callback) => {
  // Callback http status code and payload
  callback(406, { name: 'Momo' })
}

export const notFound = (data, callback) => {
  callback(404)
}

export default {
  sample,
}