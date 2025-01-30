const { professor: Professores } = require('../models/professorModel');

module.exports = {
  getAll: async (req, res) => {
    try {
      const professores = await Professores.findAll();
      if (professores.length > 0) {
        res.json(professores);
      } else {
        res.status(404).json({ error: "Nenhum professor encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar professores!", error);
      res.status(500).json({ error: "Erro ao buscar professores!" });
    }
  },

  getByCpf: async (req, res) => {
    try {
      const { cpf } = req.params;
      const professor = await Professores.findByPk(cpf);
      if (professor) {
        res.json(professor);
      } else {
        res.status(404).json({ error: "Professor não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar professor!", error);
      res.status(500).json({ error: "Erro ao buscar professor!" });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, cpf, data_nascimento, email, telefone, formacao_academica, senha_acesso, status } = req.body;

      const novoProfessor = await Professores.create({
        nome,
        cpf,
        data_nascimento,
        email,
        telefone,
        formacao_academica,
        senha_acesso,
        status
      });

      res.status(201).json(novoProfessor);
    } catch (error) {
      console.error("Erro ao criar professor!", error);
      res.status(500).json({ error: "Erro ao criar professor!" });
    }
  },

  update: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { nome, data_nascimento, email, telefone, formacao_academica, senha_acesso, status } = req.body;

      const professor = await Professores.findByPk(cpf);
      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" });
      }

      await professor.update({ nome, data_nascimento, email, telefone, formacao_academica, senha_acesso, status });

      res.json({ message: "Professor atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar professor!", error);
      res.status(500).json({ error: "Erro ao atualizar professor!" });
    }
  },

  delete: async (req, res) => {
    try {
      const { cpf } = req.params;
      const professor = await Professores.findByPk(cpf);
      if (!professor) {
        return res.status(404).json({ error: "Professor não encontrado!" });
      }

      await professor.destroy();
      res.json({ message: "Professor removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar professor!", error);
      res.status(500).json({ error: "Erro ao deletar professor!" });
    }
  }
};
