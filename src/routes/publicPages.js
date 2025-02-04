const {Router} = require('express');
const router = Router();
const {resolve} = require('path')

// Criar rotas públicas
router.get('/', (req, res)=>{
    res.sendFile(resolve('src/public/homePage.html'))
})

// Logout do usuário
router.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/');
});

module.exports = router;