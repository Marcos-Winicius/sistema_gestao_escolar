const { DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const cursosModel = require('./cursosModel')

const Turmas = sequelize.define('Turmas', {
    // Código único do curso
    // Ano . codigo do curso . V ou M
    // 2025.17015.V
    codigo: {
        type: DataTypes.STRING(12),
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    // Vincular à um curso
    id_curso: {
        type: DataTypes.STRING(40),
        allowNull: false,
        references: {
            model: cursosModel, // Nome do modelo relacionado
            key: 'codigo',        // Nome da coluna no modelo relacionado
        }
    },
    // CH total do curso
    ch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // Número de semestres
    semestres: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    turno: {
        type: DataTypes.ENUM(['Matutino', 'Vespertino', 'Noturno']),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Matutino', 'Vespertino', 'Noturno']],
                msg: 'Turno deve ser "Matutino", "Vespertino" ou "Noturno".'
            }
        }
    }
    
}, {
    modelName: 'Turmas',
    timestamps: true
})
// Definindo FK
Turmas.belongsTo(cursosModel, {
    foreignKey: 'id_curso',
    as: 'curso_turma'
});

module.exports = Turmas;