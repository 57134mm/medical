const express = require('express');
const bodyParser = require('body-parser');
const routerAuth = require('../medical/src/routes/auth');
const routerPatient = require('../medical/src/routes/patient');
const routerDepartment = require('../medical/src/routes/department');
const routerReceptionist = require('../medical/src/routes/receptionist');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/', routerAuth);
app.use('/patient', routerPatient);
app.use('/department', routerDepartment);
app.use('/receptionist', routerReceptionist);

const db = require('../medical/src/config/db');

db.sync({ force: false })
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

app.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});