const {Router} = require('express');
const {getAll, create, getById, updateDisciplina, deleteDisciplina} = require('../controllers/disciplinaController');
const router = Router();

router.get('/disciplinas', getAll);
router.get('/disciplinas/:codigo', getById);
router.post('/disciplinas/cadastrar', create);
router.put('/disciplinas/editar/:codigo', updateDisciplina)
router.delete('/disciplinas/excluir/:codigo', deleteDisciplina);

module.exports = router;