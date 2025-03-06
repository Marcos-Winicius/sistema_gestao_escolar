// Função que só funciona se o argumento passado for um objeto sequelize
function formattedData(obj){
    // obj tem que ser um objeto sequelize
    const objData = obj.get({ plain: true });
    const chaveCdict = possuiChaveComDicionario(objData);
    
    // Dicionário formatado
    const dict = {}
    if(chaveCdict){
        // Adicionando objeto ao dicionario/objeto
        Object.assign(dict, objData[chaveCdict])
    }
    // Adicionando restante das chave ao objeto formatado
    Object.keys(objData).filter(item=> item != chaveCdict && chaveCdict).forEach(chave => {
        dict[chave] = objData[chave]
    });
    // Retornar objeto formatado
    return dict;

}

function possuiChaveComDicionario(objData) {
    for (let chave in objData) {
        if (typeof objData[chave] === 'object' && objData[chave] !== null) {
            return chave; // Encontrou uma chave com um objeto
        }
    }
    return false; // Nenhuma chave possui valor que é um objeto
}


module.exports = {formattedData};
