// Responsáveis
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

exports.responsavel = sequelize.define('Responsáveis', {
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
    },
    telefone: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    parentesco: {
        type: DataTypes.STRING(15),
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
    modelName: 'Responsáveis'
})