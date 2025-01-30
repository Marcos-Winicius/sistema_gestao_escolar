const express = require('express');
const router = express.Router();
const Responsavel = require('../controllers/responsavelController');

// Listar todos os responsáveis
router.get('/responsavel', Responsavel.getAll);

// Criar um responsável
router.post('/responsavel', Responsavel.create);

// Buscar um responsável por CPF
router.get('/responsavel/:cpf', Responsavel.getByCpf);

// Atualizar um responsável
router.put('/responsavel/:cpf', Responsavel.update);

// Deletar um responsável
router.delete('/responsavel/:cpf', Responsavel.delete);

module.exports = router;
