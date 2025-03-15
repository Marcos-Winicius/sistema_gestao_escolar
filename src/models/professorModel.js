// Professores
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

const Professor = sequelize.define('Professores', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    formacao_academica: {
        type: DataTypes.TEXT,
        allowNull: false
    },
},
{
    timestamps: false,
    modelName: 'Professores'
})

Professor.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario_professor'
});

module.exports = Professor;