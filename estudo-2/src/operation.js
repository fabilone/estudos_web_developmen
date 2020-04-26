const express = require('express');
const app = express();

const rotaProdutos = require('./routes/usuarios');
const rotaCidades = require('./routes/cidade');

app.use('/usuarios', rotaProdutos);
app.use('/cidades', rotaCidades);

module.exports = app;