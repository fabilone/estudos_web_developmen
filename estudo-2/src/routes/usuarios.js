const express = require('express');
const router = express.Router();


//RETORNA TODOS OS USUÁRIOS
router.get('/', (req, res, next) =>{
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota usuário'
    });
});

//INSERE UM USUÁRIO
router.post('/', (req, res, next) => {
    const usuario = {
        nome: req.body.nome,
        email: req.body.email
    };
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota usuário',
        usuarioCriado: usuario
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