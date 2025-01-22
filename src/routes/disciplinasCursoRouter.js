const express = require('express');
const router = express.Router();
const disciplinasCursoController = require('../controllers/disciplinasCursoController');

// Rota para listar todas as associações
router.get('/disciplinas-curso', disciplinasCursoController.listar);

// Rota para listar todas as disciplinas de um curso
router.get('/disciplinas-curso/:id_curso', disciplinasCursoController.listarByCurso);

// Rota para criar uma nova associação
router.post('/disciplinas-curso/cadastrar', disciplinasCursoController.criar);

// Rota para atualizar uma associação existente
router.put('/disciplinas-curso/:id_disciplina/:id_curso', disciplinasCursoController.atualizar);

// Rota para excluir uma associação
router.delete('/disciplinas-curso/:id_disciplina/:id_curso', disciplinasCursoController.excluir);

module.exports = router;
