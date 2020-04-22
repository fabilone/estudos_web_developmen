const express = require('express'); //é um framework Node, usado no back-end, que faz as rotas. Ele é ótimo pra interagir com API's.
const bodyParser = require('body-parser'); //é ele que vai deixar a gente acessar o Body das nossas requisições e usar os dados que forem inseridos.
const mysql = require('mysql'); //módulo do MySQL 

const connection = mysql.createPool({
    host: 'localhost', // O endereço da conexão (localhost).
    user: 'usuario_teste', // O nome de usuário do banco.
    password: '5JUFBGHirkXbzZNw', // A senha do banco.
    database: 'bd_teste' // O nome do seu database.
});

