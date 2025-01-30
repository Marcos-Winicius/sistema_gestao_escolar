const { responsavel: Responsaveis } = require('../models/responsavel');

module.exports = {
  getAll: async (req, res) => {
    try {
      const responsaveis = await Responsaveis.findAll();
      if (responsaveis.length > 0) {
        res.json(responsaveis);
      } else {
        res.status(404).json({ error: "Nenhum responsável encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar responsáveis!", error);
      res.status(500).json({ error: "Erro ao buscar responsáveis!" });
    }
  },

  getByCpf: async (req, res) => {
    try {
      const { cpf } = req.params;
      const responsavel = await Responsaveis.findByPk(cpf);
      if (responsavel) {
        res.json(responsavel);
      } else {
        res.status(404).json({ error: "Responsável não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao buscar responsável!", error);
      res.status(500).json({ error: "Erro ao buscar responsável!" });
    }
  },

  create: async (req, res) => {
    try {
      const { nome, cpf, data_nascimento, email, telefone, parentesco, senha_acesso, status } = req.body;

      const novoResponsavel = await Responsaveis.create({
        nome,
        cpf,
        data_nascimento,
        email,
        telefone,
        parentesco,
        senha_acesso,
        status
      });

      res.status(201).json(novoResponsavel);
    } catch (error) {
      console.error("Erro ao criar responsável!", error);
      res.status(500).json({ error: "Erro ao criar responsável!" });
    }
  },

  update: async (req, res) => {
    try {
      const { cpf } = req.params;
      const { nome, data_nascimento, email, telefone, parentesco, senha_acesso, status } = req.body;

      const responsavel = await Responsaveis.findByPk(cpf);
      if (!responsavel) {
        return res.status(404).json({ error: "Responsável não encontrado!" });
      }

      await responsavel.update({ nome, data_nascimento, email, telefone, parentesco, senha_acesso, status });

      res.json({ message: "Responsável atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar responsável!", error);
      res.status(500).json({ error: "Erro ao atualizar responsável!" });
    }
  },

  delete: async (req, res) => {
    try {
      const { cpf } = req.params;
      const responsavel = await Responsaveis.findByPk(cpf);
      if (!responsavel) {
        return res.status(404).json({ error: "Responsável não encontrado!" });
      }

      await responsavel.destroy();
      res.json({ message: "Responsável removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar responsável!", error);
      res.status(500).json({ error: "Erro ao deletar responsável!" });
    }
  }
};
