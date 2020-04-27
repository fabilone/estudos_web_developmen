const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//RETORNA TODOS OS USUÁRIOS
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota usuário'
    });
});

//INSERE UM USUÁRIO
router.post('/', (req, res, next) => {
    /*const usuario = {
        nome: req.body.nome,
        email: req.body.email
    };*/

    //INSERINDO UM USUÁRIO NO BANCO
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO clientes (Nome, CPF) VALUES (?,?)',
            [req.body.nome, req.body.cpf],
            (error, resultado, field) =>{
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(201).send({
                    mensagem: 'Usuário inserido com sucesso',
                    id_usuario: resultado.insertId
                });
            }
            )
    });
    
});

//RETORNA OS DADOS DE UM USUÁRIO
router.get('/:id_usuario', (req, res, next) => {
    const id = req.params.id_usuario;

    if(id === 'especial'){
        res.status(201).send({
            mensagem: 'Você encontrou o Id especial',
            id: id
        });

    }else{
        res.status(200).send({
            mensagem:  'você passou um Id'
        });
    }
});

//FAZENDO UM PATCH
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de usuário'
    })
});

//DELETANDO UM USUÁRIOS
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota usuário'
    })
});


module.exports = router;