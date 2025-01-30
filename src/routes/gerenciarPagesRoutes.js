const {Router} = require('express');
const router = Router();

router.get('/disciplinas', (req, res)=>{
    res.render('gerenciarDisciplinas')
})

router.get('/alunos', (req, res)=>{
    res.render('gerenciarAlunos')
})


module.exports = router;