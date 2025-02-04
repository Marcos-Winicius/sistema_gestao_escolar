// Alunos
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel');

exports.aluno = sequelize.define('Alunos', {
    matricula: {
        type: DataTypes.STRING(14),
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.STRING(40),
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    responsavel: {
        type: DataTypes.STRING(11)
    },

},
{
    timestamps: false,
    modelName: 'Alunos'
})