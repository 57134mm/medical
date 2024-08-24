const express = require('express');
const bodyParser = require('body-parser');
const routerAuth = require('../medical/src/routes/auth');
const routerPatient = require('../medical/src/routes/patient');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', routerAuth);
app.use('/patient', routerPatient);

const db = require('../medical/src/config/db');

db.sync()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});