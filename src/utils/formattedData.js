/**
 * Formata os dados de um objeto Sequelize, mesclando suas propriedades.
 * 
 * @param {Object} obj - O objeto Sequelize que será formatado.
 * @returns {Object} Retorna um novo objeto com as propriedades organizadas.
 * 
 * @throws {Error} Se o argumento passado não for um objeto Sequelize.
 * 
 * - O argumento deve ser um objeto Sequelize.
 * - A função funciona corretamente apenas quando existe **uma única chave** cujo valor seja um objeto.
 * - Primeiro, essa chave é extraída e suas propriedades são adicionadas ao objeto resultante.
 * - Em seguida, as demais propriedades do objeto principal são adicionadas ao resultado.
 */
function formattedData(obj) {
    // obj tem que ser um objeto sequelize
    const objData = obj.get({ plain: true });
    const chaveCdict = possuiChaveComDicionario(objData);
    
    // Dicionário formatado
    const dict = {};
    if (chaveCdict) {
        // Adicionando objeto ao dicionário/objeto
        Object.assign(dict, objData[chaveCdict]);
    }
    
    // Adicionando restante das chaves ao objeto formatado
    Object.keys(objData)
        .filter(item => item !== chaveCdict && chaveCdict)
        .forEach(chave => {
            dict[chave] = objData[chave];
        });

    // Retornar objeto formatado
    return dict;
}

/**
 * Verifica se existe uma chave no objeto que tenha um valor do tipo objeto.
 * 
 * @param {Object} objData - O objeto a ser verificado.
 * @returns {string|boolean} Retorna o nome da chave caso encontre um objeto, ou `false` se não houver.
 */
function possuiChaveComDicionario(objData) {
    for (let chave in objData) {
        if (typeof objData[chave] === 'object' && objData[chave] !== null) {
            return chave; // Encontrou uma chave com um objeto
        }
    }
    return false; // Nenhuma chave possui valor que é um objeto
}

module.exports = { formattedData };
