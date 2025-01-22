const sequelize = require('../config/db');
const {Model, DataTypes} = require('sequelize');
const cursosModel = require('./cursosModel')
const disciplinasModel = require('./disciplinaModel')

class DisciplinasCurso extends Model{}

DisciplinasCurso.init({
    id_disciplina: {
        type: DataTypes.STRING(40),
        allowNull: false,
        references: {
            model: disciplinasModel, // Nome do modelo relacionado
            key: 'codigo',        // Nome da coluna no modelo relacionado
        }
    },
    id_curso: {
        type: DataTypes.STRING(40),
        allowNull: false,
        references: {
            model: cursosModel, // Nome do modelo relacionado
            key: 'codigo',        // Nome da coluna no modelo relacionado
        }
    }
},
{
    sequelize,
    modelName: 'disciplinasCurso',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_disciplina', 'id_curso'], // Definindo os campos da chave composta
        },
    ]
})

module.exports = DisciplinasCurso;

// const Disciplinas = sequelize.define({
//     codigo: {
//         type: DataTypes.STRING,
//         primary
//     },
//     nome: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// },
// {
//     sequelize,
//     tableName: 'disciplinas',
//     timestamps: false
// })