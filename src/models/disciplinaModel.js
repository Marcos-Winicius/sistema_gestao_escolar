const sequelize = require('../config/db');
const {Model, DataTypes} = require('sequelize');

class Disciplinas extends Model{}

Disciplinas.init({
    codigo: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ch: {
        type: DataTypes.INTEGER(),
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'disciplinas',
    timestamps: false
})

module.exports = Disciplinas;

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