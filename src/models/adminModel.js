// Coordenadores, Diretores ou Secretários
const sequelize = require('../config/db');
const {DataTypes} = require('sequelize');
const {Usuario: Usuarios} = require('./usuariosModel')

const Admin = sequelize.define('Administradores', {
    id_usuario: {
        type: DataTypes.STRING(40),
        primaryKey: true,
        references: {
            model: Usuarios,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    cargo: {
        type: DataTypes.ENUM(['Diretor', 'Coordenador', 'Secretário']),
        allowNull: false,
        validate: {
            isIn: {
                args: [['Diretor', 'Coordenador', 'Secretário']],
                msg: 'Cargo deve ser Diretor, Coordenador ou Secretário' 
            }
        }
    },
    
},
{
    timestamps: true,
    modelName: 'Administradores'
})
Admin.belongsTo(Usuarios, {
    foreignKey: 'id_usuario',
    as: 'usuario_adm'
});

module.exports = Admin