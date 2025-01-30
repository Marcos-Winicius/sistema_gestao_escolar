const {Router} = require('express');
const router = Router();
const alunoController = require('../controllers/alunosController'); // Ajuste o caminho conforme necessário

// Rota para buscar todos os alunos
router.get('/alunos', alunoController.getAll);

// Rota para buscar um aluno por matrícula
router.get('/alunos/:matricula', alunoController.getByMatricula);

// Rota para criar um novo aluno
router.post('/alunos', alunoController.create);

// Rota para atualizar um aluno existente
router.put('/alunos/:matricula', alunoController.update);

// Rota para deletar um aluno
router.delete('/alunos/:matricula', alunoController.delete);

module.exports = router;