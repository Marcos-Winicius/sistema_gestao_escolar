const {Router} = require('express');
const router = Router();
const cursoController = require('../controllers/cursosController');

router.get('/cursos', cursoController.getAll);
router.get('/cursos/:codigo', cursoController.getById);
router.post('/cursos', cursoController.create);
router.put('/cursos/:codigo', cursoController.updateCurso);
router.delete('/cursos/:codigo', cursoController.deleteCurso);

module.exports = router;
