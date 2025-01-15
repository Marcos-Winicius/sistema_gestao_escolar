const {Router} = require('express');
const {getAll, create, getById, updateDisciplina, deleteDisciplina} = require('../controllers/disciplinaController');
const router = Router();

router.get('/', getAll);
router.get('/:codigo', getById);
router.post('/cadastrar', create);
router.put('/editar/:codigo', updateDisciplina)
router.delete('/excluir/:codigo', deleteDisciplina);

module.exports = router;