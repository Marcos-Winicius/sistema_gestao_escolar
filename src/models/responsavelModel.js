// Responsáveis
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

exports.responsavel = sequelize.define('Responsáveis', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    parentesco: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
},
{
    timestamps: false,
    modelName: 'Responsáveis'
}).belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario_responsavel'
});