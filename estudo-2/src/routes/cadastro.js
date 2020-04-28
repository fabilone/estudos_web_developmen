const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/cadastro', (req, res, next) =>{
    mysql.getConnection((err, conn) =>{
        if(err){ return res.status(500).send({ error: err }) }
        
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if(errBcrypt) { return res.status(500).send({ error: errBcrypt })}
            conn.query(
                'INSERT INTO usuario_teste (firstname, email, senha) VALUES (?, ?, ?)',
                [req.body.firstname, req.body.email, hash],
                (error, results) => {
                    conn.release();
                    if(error) { return res.status(500).send({ error: error })}

                    response = {
                        mensagem: 'Usuario criado com sucesso',
                        usuarioCriado: {
                            id_usuario: results.insertId,
                            email: req.body.email
                        }
                    }
                    return res.status(201).send(response);
                }
            );
        });

    });


})

module.exports = router;