// Coordenadores, Diretores ou Secretários
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');

exports.admin = sequelize.define('Administradores', {
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
        allowNull: false
    },
    cargo: {
        type: DataTypes.ENUM(['Diretor', 'Coordenador', 'Secretário']),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Diretor', 'Coordenador', 'Secretário']],
                msg: 'Cargo deve ser Diretor, Coordenador ou Secretário' 
            }
        }
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    senha_acesso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1
    }

},
{
    timestamps: false,
    modelName: 'Administradores'
})