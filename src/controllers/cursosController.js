const { v4: uuid4 } = require('uuid');
const Cursos = require('../models/cursosModel');

module.exports = {
  getAll: async (req, res) => {
    try {
      const cursos = await Cursos.findAll();
      if (cursos.length > 0) {
        res.json(cursos);
      } else {
        res.status(404).json({ error: "Nenhum curso foi encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar cursos!", error);
      res.status(500).json({ error: "Erro ao buscar cursos!" });
    }
  },
  
  getById: async (req, res) => {
    const { codigo } = req.params;
    if (!codigo) {
      return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
    }
    try {
      const curso = await Cursos.findByPk(codigo);
      if (curso) {
        res.status(200).json(curso);
      } else {
        res.status(404).json({ error: "Curso não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar curso!", error);
      res.status(500).json({ error: "Erro ao buscar curso!" });
    }
  },
  
  create: async (req, res) => {
    try {
      const { nome, descricao, ch, nivel, modalidade } = req.body;
      
      // Gerar um código único de 5 dígitos
      let codigo;
      let cursoExistente;
      
      do {
        codigo = Math.floor(10000 + Math.random() * 90000); // Garante um número entre 10000 e 99999
        cursoExistente = await Cursos.findOne({ where: { codigo } });
      } while (cursoExistente); // Garante que o código gerado não está duplicado
      
      await Cursos.create({ codigo, nome, descricao, ch, nivel, modalidade });
      res.status(201).json({ msg: "Curso criado com sucesso!", codigo });
    } catch (error) {
      console.error("Erro ao criar curso!", error);
      res.status(500).json({ error: "Erro ao criar curso!" });
    }
  },
  
  updateCurso: async (req, res) => {
    const { codigo } = req.params;
    if (!codigo) {
      return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
    }
    try {
      const curso = await Cursos.findByPk(codigo);
      if (curso) {
        await curso.update(req.body);
        res.status(200).json({ msg: "Curso atualizado com sucesso!", novo: curso });
      } else {
        res.status(404).json({ error: "Curso não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao atualizar curso!", error);
      res.status(500).json({ error: "Erro ao atualizar curso!" });
    }
  },
  
  deleteCurso: async (req, res) => {
    const { codigo } = req.params;
    if (!codigo) {
      return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
    }
    try {
      await Cursos.destroy({ where: { codigo } });
      res.status(200).json({ msg: "Curso excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir curso!", error);
      res.status(500).json({ error: "Erro ao excluir curso!" });
    }
  }
};
