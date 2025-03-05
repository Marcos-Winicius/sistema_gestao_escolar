const {Router} = require('express')
const router = Router();
const turmasController = require('../controllers/turmasController');

router.get('/turmas', turmasController.getAll);
router.get('/turmas/:codigo', turmasController.getById);
router.post('/turmas/cadastrar', turmasController.create);
router.put('/turmas/editar/:codigo', turmasController.update);
router.delete('/turmas/excluir/:codigo', turmasController.delete);

module.exports = router;