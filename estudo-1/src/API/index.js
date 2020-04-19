

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//defindo rotas para os clientes
/*
router.get('/clientes', (req, res) => {
    execSQLQuery('SELECT * FROM clientes', res);
})*/

//definindo rota para apenas um usuário
router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM clientes' + filter, res);
})


//Excluindo um cliente

router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM clientes WHERE ID=' + parseInt(req.params.id), res);
})

//Adicionando um cliente
router.post('/clientes', (req, res) => {
    const nome = req.body.nome.substring(0, 150);
    const cpf = req.body.cpf.substring(0, 11);
    execSQLQuery(`INSERT INTO clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});







function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'usuario_teste',
        password: '5JUFBGHirkXbzZNw',
        database: 'bd_teste'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}