const {Sequelize} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/gestao_escolar.sqlite',
    logging: false
});

(async()=>{
    try {
        await sequelize.authenticate();
        await syncBd();
        console.log('Conexão com banco de dados estabelecida!')
    } catch (error) {
        console.log('Erro ao conectar ao banco!', error)
    }
})();


async function syncBd(){
    try {
        await sequelize.sync({force: false});
        console.log('Banco de dados sincronizado!')
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados!', error);
    }
}

module.exports = sequelize;