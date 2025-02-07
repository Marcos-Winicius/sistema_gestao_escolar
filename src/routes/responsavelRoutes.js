const express = require('express');
const router = express.Router();
const Responsavel = require('../controllers/responsavelController');

// Listar todos os responsáveis
router.get('/responsavel', Responsavel.getAll);

// Criar um responsável
router.post('/responsavel/cadastrar', Responsavel.create);

// Buscar um responsável por CPF
router.get('/responsavel/:id', Responsavel.getById);

// Atualizar um responsável
router.put('/responsavel/editar/:id', Responsavel.update);

// Deletar um responsável
router.delete('/responsavel/excluir/:id', Responsavel.delete);

module.exports = router;
