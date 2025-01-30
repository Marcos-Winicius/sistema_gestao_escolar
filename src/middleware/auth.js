// Middleware para verificar se um token é válido ou não
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=>{
    const token = req.cookies.auth_token;

    if(!token){
        // caso não haja token, redirecionar para página de login
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
        if(err){
            return res.redirect('/login');
        }

        req.user = {
            id: decoded.id,
            nome: decoded.nome,
            tipo: decoded.tipo
        }

        // Prosseguimos para a próxima função
        next();
    })
}