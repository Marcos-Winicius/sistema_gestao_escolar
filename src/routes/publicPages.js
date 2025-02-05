const {Router} = require('express');
const router = Router();
const {resolve} = require('path')
const {Usuario: Usuarios} = require('../models/usuariosModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

router.post('/login', async(req, res)=>{
    const {login, senha} = req.body;
    if(!login || !senha){
        return res.render('login', {error: "Informações Ausentes!!"})
    }
    try {
        // Verificar se existe no banco
        const usuario = await Usuarios.findOne({where: {login}});
        
        if(!usuario){
            return res.render('login', {error: "Esse login não existe!"})
        }
        
        // Verificar se a senha é a mesma
        const validarSenha = await bcrypt.compare(senha, usuario.senha_acesso);
        if(!validarSenha){
            return res.render('login', {error: "Senha inválida!"})
        }
        
        // Se tudo der certo iremos criar o token e jogar nos cookies
        
        const token = jwt.sign({ id: usuario.id, nome: usuario.nome, tipo: usuario.tipo}, process.env.JWT_SECRET, { expiresIn: '1h' });
        // Apenas para depurar -> console.log(token)
        // Salve o token em um cookie e redirecione para a página do usuário
        res.cookie('auth_token', token, { httpOnly: true });
        res.redirect('/home');
        
    } catch (error) {
        console.error(error)
    }
})

router.get('/cadastro', (req, res)=>{
    // Renderizar página html ou arquivo EJS
    res.render('cadastroEstudante');
})



module.exports = router;