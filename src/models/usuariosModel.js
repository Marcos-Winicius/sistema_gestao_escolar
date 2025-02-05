// Coordenadores, Diretores ou Secretários
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const roles = ['Administrador', 'Professor', 'Aluno', 'Responsável']

exports.Usuario = sequelize.define('Usuarios', {
    id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        // allowNull: false
    },
    login: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(14)
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DataTypes.ENUM(roles),
        allowNull: false,
        validate: {
            isIn: {
                args: [roles],
                msg: "Cargo deve ser 'Administrador', 'Professor', 'Aluno' ou 'Responsável'" 
            }
        }
    },

    senha_acesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    }
},
{
    timestamps: false,
    modelName: 'Usuarios'
})