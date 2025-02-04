const {Router} = require('express');
const router = Router();
const Professor = require('../controllers/professorController');

// Listar todos os professores
router.get('/professor', Professor.getAll);

// Criar um professor
router.post('/professor/cadastrar', Professor.create);

// Buscar um professor por CPF
router.get('/professor/:cpf', Professor.getByCpf);

// Atualizar um professor
router.put('/professor/editar/:cpf', Professor.update);

// Deletar um professor
router.delete('/professor/excluir/:cpf', Professor.delete);

module.exports = router;
