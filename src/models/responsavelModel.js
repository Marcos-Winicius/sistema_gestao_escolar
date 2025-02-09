// Responsáveis
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

const Responsavel = sequelize.define('Responsaveis', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    parentesco: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
},
{
    timestamps: false,
    modelName: 'Responsaveis'
})

Responsavel.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario_responsavel'
});

module.exports = Responsavel