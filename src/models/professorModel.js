// Professores
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

exports.professor = sequelize.define('professores', {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: true,
        primaryKey: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    telefone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    formacao_academica: {
        type: DataTypes.TEXT,
        allowNull: false
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
    modelName: 'Professores'
})