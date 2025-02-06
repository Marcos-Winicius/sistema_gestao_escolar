const {Router} = require('express');
const router = Router();
const gerenciarPagesRoutes = require('./gerenciarPagesRoutes')
const verifyToken = require('../middleware/auth')
const authorization = require('../middleware/autorizar')

// Criar rotas privadas
router.get('/home', verifyToken, (req, res)=>{
    res.render('index', {user: req.user})
})
// Rota que só o adm pode acessar
router.use('/gerenciar', verifyToken, authorization(['Administrador']))
router.use('/gerenciar', gerenciarPagesRoutes)


module.exports = router;