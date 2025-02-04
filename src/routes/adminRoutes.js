const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Ajuste o caminho conforme necessário

// Rota para buscar todos os administradores
router.get('/administradores', adminController.getAll);

// Rota para buscar um administrador por ID
router.get('/administradores/:id', adminController.getById);

// Rota para criar um novo administrador
router.post('/administradores/cadastrar', adminController.create);

// Rota para atualizar um administrador existente
router.put('/administradores/editar/:id', adminController.update);

// Rota para deletar um administrador
router.delete('/administradores/excluir/:id', adminController.delete);

module.exports = router;