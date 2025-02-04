// Coordenadores, Diretores ou Secretários
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

exports.admin = sequelize.define('Administradores', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        }
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
    
},
{
    timestamps: true,
    modelName: 'Administradores'
})