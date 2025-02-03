const {Router} = require('express');
const router = Router();
// Middleware auth
// const {verifyToken} = require('../middleware/auth');

router.get('/disciplinas', (req, res)=>{
    res.render('gerenciarDisciplinas')
})

router.get('/alunos', (req, res)=>{
    res.render('gerenciarAlunos')
})

router.get('/responsavel', (req, res)=>{
    res.render('gerenciarResponsaveis')
})

router.get('/professor', (req, res)=>{
    res.render('gerenciarProfessores')
})

router.get('/administrador', (req, res)=>{
    res.render('gerenciarAdministradores')
})

module.exports = router;