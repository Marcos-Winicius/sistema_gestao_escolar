const {Router} = require('express');
const router = Router();
const {resolve} = require('path')
// Controller
const publicPageController = require('../controllers/publicPagesController')

// Criar rotas públicas
router.get('/', (req, res)=>{
    res.sendFile(resolve('src/public/homePage.html'))
})

// Logout do usuário
router.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.redirect('/');
});

router.get('/login', (req, res)=>{
    // Renderizar página html ou arquivo EJS
    res.render('login');
})

router.post('/login', publicPageController.loginUser)



module.exports = router;