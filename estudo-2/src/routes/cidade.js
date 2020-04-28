const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//RETORNA TODAS AS CIDADES
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'SELECT * FROM cidade;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                //Detalhamento da requisição
                const response = {
                    quantidade: resultado.length,
                    cidade: resultado.map(city => {
                        return {
                            id_cidade: city.codigo,
                            pais: city.pais,
                            nome: city.nome_cidade,
                            estado: city.estado,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todas as cidades.',
                                url: 'http://localhost:3000/cidades/' + city.codigo
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    });
});

//INSERE UMA CIDADE
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO cidade (pais, nome_cidade, estado) VALUES (?,?,?)',
            [req.body.pais, req.body.nome_cidade, req.body.estado],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                const response = {
                    mensagem: 'Cidade inserida com sucesso!',
                    cidade: {
                        id_cidade: req.body.codigo,
                        pais: req.body.pais,
                        cidade: req.body.nome_cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'GET',
                            descriacao: 'Insere uma cidade.',
                            url: 'http://localhost:3000/cidades'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
});

//RETORNA OS DADOS DE UMA CIDADE
router.get('/:id_cidade', (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM cidade WHERE codigo = ?;',
            [req.params.id_cidade],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado essa cidade na base de dados'
                    })
                }

                const response = {
                    cidade: {
                        id_cidade: resultado[0].codigo,
                        pais: resultado[0].pais,
                        cidade: resultado[0].nome_cidade,
                        estado: resultado[0].estado,
                        request: {
                            tipo: 'GET',
                            descriacao: 'Retorna uma cidade',
                            url: 'http://localhost:3000/cidades/' + resultado[0].codigo
                        }
                    }
                }
                return res.status(200).send(response);
            }

        )
    });

});

//ATUALIZA UMA CIDADE
router.patch('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'UPDATE cidade SET pais = ?, nome_cidade = ?, estado = ? WHERE codigo = ?;',
            [req.body.pais, req.body.nome_cidade, req.body.estado, req.body.id_cidade],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    cidade: {
                        id_cidade: req.body.id_cidade,
                        pais: req.body.pais,
                        cidade: req.body.nome_cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'GET',
                            descriacao: 'Cidade atualizada com sucesso.',
                            url: 'http://localhost:3000/cidades/' + req.body.id_cidade
                        }
                    }
                }
                return res.status(202).send(response);

            }
        )
    });
});

//DELETANDO UMA CIDADE
router.delete('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM cidade WHERE codigo = ?;',
            [req.body.id_cidade],
            (error, resultado, fields) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    mensagem: 'Cidade removida com sucesso.',
                    request: {
                        tipo: 'POST',
                        descriacao: 'Deleta uma cidade',
                        url: 'http://localhost:3000/cidades/',
                        body: {
                            pais: 'string',
                            cidade: 'string',
                            estado: 'string'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
});


module.exports = router;