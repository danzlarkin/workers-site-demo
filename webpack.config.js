// Import the required node modules
const webpack = require('webpack');

// Describe the configuration function
module.exports = () => {

  // Build the client side of code
  webpack({
    target: `web`,
    entry: `${__dirname}/src/client/client.js`,
    output: {
      path: `${__dirname}/public/js/`,
      filename: `main.js`
    }
  }, () => {});

  // Return the worker / server side configuration
  return {
    target: `webworker`,
    entry: `${__dirname}/src/server/server.js`,
    output: {
      path: `${__dirname}/worker-output`,
      filename: `worker.js`
    },
    watchOptions: {
      ignored: `${__dirname}/public/`
    }
  }
}