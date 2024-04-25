const express = require('express');
const persons = require('./db');
const app = express();
app.set("db", persons);

module.exports = app;