const { Usuario: Usuarios} = require('../models/usuariosModel');
const {v4: uuidv4} = require('uuid');

module.exports = {
    getAll: async () => {
        try {
            const usuarios = await Usuarios.findAll();
            return usuarios;
        } catch (error) {
            console.error("Erro ao buscar Usuarios!", error);
            return {error: "Erro ao buscar Usuários!"};
        }
    },
    
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuarios.findByPk(id);
            if (usuario) {
                return usuario;
            } else {
                return {error: "Usuário não encontrado!" };
            }
        } catch (error) {
            console.error("Erro ao buscar usuario!", error);
            return { error: "Erro ao buscar usuário!" };
        }
    },
    
    create: async (obj) => {
        try {
            const {nome, cpf, data_nascimento, tipo, login, telefone, email, senha_acesso} = obj;
            const id = uuidv4();
            const novoUsuario = await Usuarios.create({
                id,
                nome,
                cpf,
                data_nascimento,
                login,
                telefone,
                email,
                senha_acesso,
                tipo
            });
            
            return novoUsuario;
        } catch (error) {
            console.error("Erro ao criar administrador!", error);
            return error
        }
    },
    
    update: async (obj) => {
        try {
            const { id } = req.params;
            const {nome, cpf, data_nascimento, telefone, email} = req.body;
            
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return {error: 'Usuário não encontrado'};
            }
            
            await usuario.update({nome, cpf, data_nascimento, tipo, login, telefone, email, senha_acesso});
            return {msg: 'User atualizado com sucesso!'};
        } catch (error) {
            console.error("Erro ao atualizar Usuário!", error);
            return {error: 'Erro ao atualizar Usuário'};
        }
    },
    
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return { error: "Usuário não encontrado!" };
            }
            
            await usuario.destroy();
            return {msg: "Usuário removido com sucesso!" };
        } catch (error) {
            console.error("Erro ao deletar Usuário!", error);
            return { error: "Erro ao deletar Usuário!" };
        }
    }
};
