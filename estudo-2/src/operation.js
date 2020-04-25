const express = require('express');
const app = express();

const rotaProdutos = require('./routes/usuarios');

app.use('/usuarios', rotaProdutos);

module.exports = app;