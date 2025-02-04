// Alunos
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel');

const Aluno = sequelize.define('Alunos', {
    matricula: {
        type: DataTypes.STRING(14),
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.STRING(40),
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    responsavel: {
        type: DataTypes.STRING(11)
    },

},
{
    timestamps: false,
    modelName: 'Alunos'
})

// **Definição da relação**
Aluno.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario'
});

module.exports = Aluno;