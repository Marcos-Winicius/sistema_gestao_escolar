const {Router} = require('express');
const router = Router();
const alunosController = require('../controllers/alunosController')
router.get('/login', (req, res)=>{
    // Renderizar página html ou arquivo EJS
    res.render('loginEstudante');
})

router.post('/login', alunosController.login);

module.exports = router;