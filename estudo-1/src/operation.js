const mysql = require('mysql'); //módulo do MySQL
const express = require('express'); //é um framework Node, usado no back-end, que faz as rotas. Ele é ótimo pra interagir com API's.
const bodyParser = require('body-parser'); //é ele que vai deixar a gente acessar o Body das nossas requisições e usar os dados que forem inseridos.


const app = express();

app.use(bodyParser.json());

const mysqlConnection = mysql.createConnection({
    host: 'localhost', // O endereço da conexão (localhost).
    user: 'usuario_teste', // O nome de usuário do banco.
    password: '5JUFBGHirkXbzZNw', // A senha do banco.
    database: 'bd_teste' // O nome do seu database.
});

mysqlConnection.connect((err) =>{
    if(!err) console.log('DB conection OK!');
    else console.log('DB connection falhou! \n Erro: '+JSON.stringify(err, undefined, 2));
})

// Iniciando o servidor.
app.listen(3000, () => {
    console.log('Vai no navegador e entra em http://localhost:3000/users pra ver os usuários cadastrados.');
});

// Criando uma rota GET que retorna os dados da tabela usuários.
app.get('/users', (res, req) => {

    // Executando a query MySQL (selecionar todos os dados da tabela usuário).
        mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
            if(!err) console.log(rows);
            // Caso ocorra algum erro, não irá executar corretamente.if (error) throw error;
            else console.log(err);

        })
    });
