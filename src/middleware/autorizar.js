const {resolve} = require('path')
// Middleware para verificar se o usuário tem um tipo permitido
function authorize(allowedRoles) {
    // AllowedRoles é pra ser um array que virá nesse formato ['Professor', 'Administrador'] ou ['Aluno']
    return (req, res, next) => {
        const tipo_user = req.user.tipo;

        if (tipo_user && allowedRoles.includes(tipo_user)) {
            next(); // Usuário está autorizado, continuar para a próxima função
        } else {
            return res.status(403).sendFile(resolve('src/public/erro-403.html'));
        }
    };
}

module.exports = authorize;
