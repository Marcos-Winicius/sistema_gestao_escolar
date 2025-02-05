const {Router} = require('express');
const router = Router();
const alunosController = require('../controllers/alunosController')

// router.get('/perfil', (req, res)=>{

// })
router.get('/cadastro', (req, res)=>{
    // Renderizar página html ou arquivo EJS
    res.render('cadastroEstudante');
})

router.post('/cadastro', alunosController.cadastro);

module.exports = router;