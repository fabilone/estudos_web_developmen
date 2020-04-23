
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

class Conexao {

    constructor(props) {
    this.Connection();

    }

    Connection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'usuario_teste',
        password: '5JUFBGHirkXbzZNw',
        database: 'bd_teste'
    });

        connection.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
}

}

$teste_valor = new Conexao();
