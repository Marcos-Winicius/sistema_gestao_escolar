const {Router} = require('express');
const router = Router();

router.get('/disciplinas', (req, res)=>{
    res.render('gerenciarDisciplinas')
})

router.get('/alunos', (req, res)=>{
    res.render('gerenciarAlunos')
})

router.get('/responsavel', (req, res)=>{
    res.render('gerenciarResponsaveis')
})

module.exports = router;