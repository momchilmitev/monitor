/**
 * Creating and exporting configuration variables
 */

// Eviroments
const enviroments = {
  staging: {
    port: 3000,
    envName: 'staging',
  },
  production: {
    port: 5000,
    envName: 'production',
  },
};

// Getting the current enviroment
const currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Exporting the coreponding enviroment object
export default typeof(enviroments[currentEnviroment]) === 'object' ? enviroments[currentEnviroment] : enviroments.staging;