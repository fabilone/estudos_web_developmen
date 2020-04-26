const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota usuário'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota usuário'
    });
});

router.get('/:id_usuario', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o GET dentro da rota usuário. Buscando usuário especifico'
    });
});


module.exports = router;