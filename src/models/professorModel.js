// Professores
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

exports.professor = sequelize.define('professores', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    formacao_academica: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    timestamps: false,
    modelName: 'Professores'
}).belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario_professor'
});