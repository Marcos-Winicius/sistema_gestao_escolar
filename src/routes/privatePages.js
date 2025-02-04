const {Router} = require('express');
const router = Router();
const {resolve} = require('path')
const {verifyToken} = require('../middleware/auth')

// Criar rotas privadas
router.get('/home', verifyToken, (req, res)=>{
    res.render('index', {user: req.user})
})


module.exports = router;