const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Medical',
    description: ''
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/*'];

swaggerAutogen(outputFile, routes, doc);