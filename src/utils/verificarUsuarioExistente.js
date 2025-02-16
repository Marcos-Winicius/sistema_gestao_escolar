const { Usuario } = require('../models/usuariosModel'); // Ajuste o caminho conforme necessário
const { Op } = require('sequelize');

const verificarUsuarioExistente = async (email, cpf) => {
    // Buscar usuários com o mesmo email ou CPF
    const existingUser = await Usuario.findOne({
        where: {
            [Op.or]: [{ email }, { cpf }]
        }
    });

    if (!existingUser) return null;

    if (existingUser.email === email && existingUser.cpf === cpf) {
        return "Email e CPF já estão em uso!";
    } else if (existingUser.email === email) {
        return "Este email já está cadastrado!";
    } else if (existingUser.cpf === cpf) {
        return "Este CPF já está cadastrado!";
    } else {
        return "Este login já está cadastrado!";
    }
};

module.exports = verificarUsuarioExistente;
