const express = require('express');
const router = express.Router();


//RETORNA TODAS AS CIDADES
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todas as cidades'
    });
});

//INSERE UMA CIDADE
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Inserindo uma cidade'
    });
});

//RETORNA OS DADOS DE UMA CIDADE
router.get('/:id_cidade', (req, res, next) => {
    const id = req.params.id_cidade;

    
        res.status(201).send({
            mensagem: 'Você escolheu a cidade',
            id: id
        });

});

//ATUALIZA UMA CIDADE
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Atualizando uma cidade'
    })
});

//DELETANDO UMA CIDADE
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Deletando uma cidade'
    })
});


module.exports = router;