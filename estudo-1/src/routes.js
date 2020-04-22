const express = require('express'); //é um framework Node, usado no back-end, que faz as rotas. Ele é ótimo pra interagir com API's.
const bodyParser = require('body-parser'); //é ele que vai deixar a gente acessar o Body das nossas requisições e usar os dados que forem inseridos.
const mysql = require('mysql'); //módulo do MySQL 

const connection = mysql.createPool({
    host: 'localhost', // O endereço da conexão (localhost).
    user: 'usuario_teste', // O nome de usuário do banco.
    password: '5JUFBGHirkXbzZNw', // A senha do banco.
    database: 'bd_teste' // O nome do seu database.
});

// Iniciando o app.
const app = express();

// Criando uma rota GET que retorna os dados da tabela usuários.
app.get('/users', function (req, res) {
    // Conectando ao banco.
    connection.getConnection(function (err, connection) {

        // Executando a query MySQL (selecionar todos os dados da tabela usuário).
        connection.query('SELECT * FROM clientes', function (error, results, fields) {
            // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;

            // Pegando a 'resposta' do servidor pra nossa requisição. Ou seja, aqui ele vai mandar nossos dados.
            res.send(results)
        });
    });
});

// Iniciando o servidor.
app.listen(3000, () => {
    console.log('Vai no navegador e entra em http://localhost:3000/users pra ver os usuários cadastrados.');
});
