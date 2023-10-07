const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
  info: {
    title: 'Contacts API',
    description: 'List of people',
  },
  servers: [
    {
        url: "http://localhost:3000/",
        description: "Local server"
    },
    {
        url: "https://contactscrud.onrender.com/",
        description: "Live server"
    }
  ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);