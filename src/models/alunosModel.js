// Alunos
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

exports.aluno = sequelize.define('Alunos', {
    matricula: {
        type: DataTypes.STRING(14),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true
    },
    data_nascimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
    },
    responsavel: {
        type: DataTypes.STRING(11)
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
    modelName: 'Alunos'
})