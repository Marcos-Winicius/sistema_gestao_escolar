const { aluno: Alunos } = require('../models/alunosModel');

module.exports = {
  getAll: async (req, res) => {
    try {
      const alunos = await Alunos.findAll();
      if (alunos.length > 0) {
        res.json(alunos);
      } else {
        res.status(404).json({ error: "Nenhum aluno encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar alunos!", error);
      res.status(500).json({ error: "Erro ao buscar alunos!" });
    }
  },

  getByMatricula: async (req, res) => {
    try {
      const { matricula } = req.params;
      const aluno = await Alunos.findByPk(matricula);
      if (aluno) {
        res.json(aluno);
      } else {
        res.status(404).json({ error: "Aluno não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar aluno!", error);
      res.status(500).json({ error: "Erro ao buscar aluno!" });
    }
  },

  create: async (req, res) => {
    try {
      const { matricula, nome, cpf, data_nascimento, serie, turma, email, responsavel, senha_acesso, status } = req.body;

      const novoAluno = await Alunos.create({
        matricula,
        nome,
        cpf,
        data_nascimento,
        serie,
        turma,
        email,
        responsavel,
        senha_acesso,
        status
      });

      res.status(201).json(novoAluno);
    } catch (error) {
      console.error("Erro ao criar aluno!", error);
      res.status(500).json({ error: "Erro ao criar aluno!" });
    }
  },

  update: async (req, res) => {
    try {
      const { matricula } = req.params;
      const { nome, cpf, data_nascimento, serie, turma, email, responsavel, senha_acesso, status } = req.body;

      const aluno = await Alunos.findByPk(matricula);
      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado!" });
      }

      await aluno.update({ nome, cpf, data_nascimento, serie, turma, email, responsavel, senha_acesso, status });

      res.json({ message: "Aluno atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar aluno!", error);
      res.status(500).json({ error: "Erro ao atualizar aluno!" });
    }
  },

  delete: async (req, res) => {
    try {
      const { matricula } = req.params;
      const aluno = await Alunos.findByPk(matricula);
      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado!" });
      }

      await aluno.destroy();
      res.json({ message: "Aluno removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar aluno!", error);
      res.status(500).json({ error: "Erro ao deletar aluno!" });
    }
  }
};
