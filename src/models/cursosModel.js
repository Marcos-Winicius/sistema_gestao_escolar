const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Cursos = sequelize.define('Cursos', {
    codigo: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
    },
    ch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nivel: {
        type: DataTypes.ENUM(['Técnico', 'Graduação', 'Técnólogo']),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Técnico', 'Graduação', 'Tecnólogo']],
                msg: 'Nivel deve ser "Técnico", "Graduação" ou "Tecnólogo".'
            }
        }
    },
    modalidade: {
        type: DataTypes.ENUM('Presencial', 'Híbrido', 'Online'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Presencial', 'Híbrido', 'Online']],
                msg: 'Modalidade deve ser "Presencial", "Híbrido" ou "Online".'
            }
        }
    }
}, {
    modelName: 'Cursos',
    timestamps: true
})


module.exports = Cursos;