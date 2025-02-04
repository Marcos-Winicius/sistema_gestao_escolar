const { Usuario: Usuarios} = require('../models/usuariosModel');
const {v4: uuidv4} = require('uuid');

module.exports = {
    getAll: async (req, res) => {
        try {
            const usuarios = await Usuarios.findAll();
            if (usuarios.length > 0) {
                res.json(usuarios);
            } else {
                res.status(404).json({ error: "Nenhum administrador encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao buscar Usuarios!", error);
            res.status(500).json({ error: "Erro ao buscar Usuarios!" });
        }
    },
    
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuarios.findByPk(id);
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ error: "Usuário não encontrado!" });
            }
        } catch (error) {
            console.error("Erro ao buscar usuario!", error);
            res.status(500).json({ error: "Erro ao buscar usuário!" });
        }
    },
    
    create: async (req, res) => {
        try {
            const {nome, cpf, data_nascimento, tipo, login, telefone, email, senha_acesso} = req.body;
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
            
            res.status(201).json(novoUsuario);
        } catch (error) {
            console.error("Erro ao criar administrador!", error);
            res.status(500).json({ error: "Erro ao criar administrador!" });
        }
    },
    
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const {nome, cpf, data_nascimento, tipo, login, telefone, email, senha_acesso} = req.body;
            
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado!" });
            }
            
            await usuario.update({nome, cpf, data_nascimento, tipo, login, telefone, email, senha_acesso});
            
            res.json({ message: "Usuário atualizado com sucesso!" });
        } catch (error) {
            console.error("Erro ao atualizar Usuário!", error);
            res.status(500).json({ error: "Erro ao atualizar Usuário!" });
        }
    },
    
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await Usuarios.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: "Usuário não encontrado!" });
            }
            
            await usuario.destroy();
            res.json({ message: "Usuário removido com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar Usuário!", error);
            res.status(500).json({ error: "Erro ao deletar Usuário!" });
        }
    }
};
