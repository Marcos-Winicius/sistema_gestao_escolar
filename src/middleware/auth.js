// Middleware para verificar se um token é válido ou não
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    const token = req.cookies.auth_token;
    if(!token){
        // caso não haja token, redirecionar para página de login
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
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

module.exports = verifyToken;