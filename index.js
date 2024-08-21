const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const db = require('../medical/src/config/db');
const User = require('../medical/src/models/User');

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