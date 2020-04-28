const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

//const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage });

/*
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
});
*/


//RETORNA TODOS OS USUÁRIOS
router.get('/', (req, res, next) =>{
    /*
    //Primeiro Teste
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota usuário'
    });
    */
   /*
   //Segundo Teste
   mysql.getConnection((error, conn) =>{
       conn.query(
           'SELECT * FROM clientes;',
           (error, resultado, field) =>{
               if(error){ return res.status(500).send({ error: error })}
               return res.status(200).send({response: resultado})
           }
       )
   });*/

    //Terceiro Teste
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM clientes;',
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                //Detalhamento da requisição
                const response = {
                    quantidade: resultado.length,
                    usuario: resultado.map( user => {
                        return {
                            id_usuario: user.ID,
                            nome: user.Nome,
                            cpf: user.CPF,
                            request:{
                                tipo: 'GET',
                                descricao: 'Retorna todos os usuarios',
                                url: 'http://localhost:3000/usuarios/'+ user.ID
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
});

//INSERE UM USUÁRIO
//router.post('/', (req, res, next) => {
router.post('/', (upload.single('usuario_imagem')), (req, res, next) => {
    console.log(req.file);

    //Primeiro Teste
    /*const usuario = {
        nome: req.body.nome,
        email: req.body.email
    };*/

    /*
    //Segundo Teste
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
    */

    //Terceiro Teste
    //INSERINDO UM USUÁRIO NO BANCO
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO clientes (Nome, CPF) VALUES (?,?)',
            [req.body.nome, req.body.cpf],
            (error, resultado, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                const response = {
                    mensagem: 'Usuario inserido com sucesso!',
                    usuario: {
                        id_usuario: resultado.ID,
                        nome: resultado.Nome,
                        cpf: resultado.CPF,
                        request:{
                            tipo: 'GET',
                            descriacao: 'Insere um usuario',
                            url: 'http://localhost:3000/usuarios'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
    
});

//RETORNA OS DADOS DE UM USUÁRIO
router.get('/:id_usuario', (req, res, next) => {
    const id = req.params.id_usuario;

    /*
    //Primeiro Teste
    if(id === 'especial'){
        res.status(201).send({
            mensagem: 'Você encontrou o Id especial',
            id: id
        });

    }else{
        res.status(200).send({
            mensagem:  'você passou um Id'
        });
    }*/

    /*
    //Segundo Teste
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM clientes WHERE id = ?;',
            [req.params.id_usuario],
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ error: error })}
                return res.status(200).send({ response: resultado })
            }

        )
    });

    */
    //Terceiro Teste
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM clientes WHERE ID = ?;',
            [req.params.id_usuario],
            (error, resultado, fields) => {
                if(error) { return res.status(500).send({ error: error })}

                if(resultado.length == 0 ){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado usuario na base de dados'
                    })
                }

                const response = {
                    usuario:{
                        id_usuario: resultado[0].ID,
                        nome: resultado[0].Nome,
                        cpf: resultado[0].CPF,
                        request:{
                            tipo: 'GET',
                            descriacao: 'Retorna um usuario',
                            url: 'http://localhost:3000/usuarios/'+ resultado[0].ID
                        }
                    }
                }
                return res.status(200).send(response);
            }

        )
    });
});

//FAZENDO UM PATCH
router.patch('/', (req, res, next) => {

    /*
    //Primeiro Teste
    res.status(201).send({
        mensagem: 'Usando o PATCH dentro da rota de usuário'
    })*/

    /*
    //Segundo Teste
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE clientes SET Nome = ?, CPF = ? WHERE ID = ?;',
            [req.body.nome, req.body.cpf, req.body.id_usuario],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Usuário atualizando com sucesso'
                });
            }
        )
    });
    */

    
    //Terceiro Teste
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE clientes SET Nome = ?, CPF = ? WHERE ID = ?;',
            [req.body.nome, req.body.cpf, req.body.id_usuario],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    usuario: {
                        id_usuario: req.body.id_usuario,
                        nome: req.body.nome,
                        cpf: req.body.cpf,
                        request: {
                            tipo: 'GET',
                            descriacao: 'Usuário atualizado com sucesso.',
                            url: 'http://localhost:3000/usuarios/' + req.body.id_usuario
                        }
                    }
                }
                return res.status(202).send(response);

            }
        )
    });
});

//DELETANDO UM USUÁRIOS
router.delete('/', (req, res, next) => {

    /*
    //Primeiro Teste
    res.status(201).send({
        mensagem: 'Usando o DELETE dentro da rota usuário'
    })
    */
   /*
   //Segundo Teste
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM clientes WHERE ID = ?;',
            [req.body.id_usuario],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Usuário deletado com sucesso'
                });
            }
        )
    });
    */

    //Terceiro Teste
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM clientes WHERE ID = ?;',
            [req.body.id_usuario],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                
                const response = {
                    mensagem: 'Produto removido com sucesso.',
                    request: {
                            tipo: 'POST',
                            descriacao: 'Deleta um usuário',
                            url: 'http://localhost:3000/usuarios/',
                            body: {
                                nome: 'string',
                                cpf: 'number'
                            }
                        }
                }
                return res.status(202).send( response );
            }
        )
    });
    
});


module.exports = router;