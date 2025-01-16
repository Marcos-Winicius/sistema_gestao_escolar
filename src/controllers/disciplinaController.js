const { v4: uuid4 } = require('uuid');
const Disciplinas = require('../models/disciplinaModel');

module.exports = {
    getAll: async(req, res)=>{
        try {
            const disciplinas = await Disciplinas.findAll();
            if(disciplinas.length > 0){
                res.json(disciplinas)
            }else{
                res.status(404).json({error: "Nenhuma disciplina foi encontrada!"})
            }
        } catch (error) {
            console.error("Erro ao buscar dados!", error)
        }
    },
    getById: async(req,res)=>{
        const {codigo} = req.params;
        if(!codigo){
            return res.status(400).json({error: "Parâmetro inválido ou ausente!"})
        }
        try {
            const disciplina = await Disciplinas.findByPk(codigo);
            if(disciplina){
                res.status(200).json(disciplina)
            }else{
                res.status(404).json({error: "Disciplina não encontrada!"})
            }
        } catch (error) {
            console.error('Erro ao procurar disciplina!', error)
        }
    },
    create: async(req, res)=>{
        try {
            const {nome, ch, professor} = req.body;
            const codigo = uuid4();
    
            await Disciplinas.create({codigo, nome, ch, professor});
            res.status(201).json({msg: "Disciplina criada com sucesso!"})    
        } catch (error) {
            res.status(500).json({error: error})
            console.error('Erro ao criar disciplina!', error)
        }
    },
    updateDisciplina: async(req, res)=>{
        const {codigo} = req.params;
        if(!codigo){
            return res.status(400).json({error: "Parâmetro inválido ou ausente!"})
        }
        try {
            const disciplina = await Disciplinas.findByPk(codigo);
            if(disciplina){
                await disciplina.update(req.body);
                res.status(200).json({msg: "Disciplina atualizada com sucesso!", nova: disciplina})
            }else{
                res.status(404).json({error: "Disciplina não encontrada!"})
            }
        } catch (error) {
            res.status(500).json({error: error})
            console.error('Erro ao atualizar disciplina!', error)
        }
    },

    deleteDisciplina: async(req, res)=>{
        const {codigo} = req.params;
        if(!codigo){
            return res.status(400).json({error: "Parâmetro inválido ou ausente!"})
        }
        try {
            await Disciplinas.destroy({where: {codigo}})
            res.status(200).json({msg: "Disciplina excluida com sucesso!"});
        } catch (error) {
            res.status(500).json({error: error})
            console.error('Erro ao deletar disciplina!', error)
        }
    }
}