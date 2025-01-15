const {Router} = require('express');
const router = Router();

router.get('/', (req, res)=>{
    res.render('gerenciarDisciplinas')
})



module.exports = router;