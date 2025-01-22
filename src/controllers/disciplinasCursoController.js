const DisciplinasCurso = require('../models/disciplinasCursoModel');

const disciplinasCursoController = {
  // Listar todas as associações de disciplinas e cursos
  async listar(req, res) {
    try {
      const disciplinasCursos = await DisciplinasCurso.findAll();
      return res.status(200).json(disciplinasCursos);
    } catch (error) {
      console.error('Erro ao listar disciplinas e cursos:', error);
      return res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
  },
  async listarByCurso(req, res) {
    try {
      const { id_curso } = req.params;
  
      if (!id_curso) {
        return res.status(400).json({ error: "Ausência de parâmetros" });
      }
  
      // Busca todas as disciplinas relacionadas ao curso
      const disciplinasCurso = await DisciplinasCurso.findAll({
        where: { id_curso: id_curso }
      });
  
      // Checa se encontrou resultados
      if (disciplinasCurso && disciplinasCurso.length > 0) {
        return res.status(200).json(disciplinasCurso);
      } else {
        return res.status(404).json({ error: "Este curso não possui disciplinas ou não existe!" });
      }
    } catch (error) {
      console.error('Erro ao listar disciplinas e cursos:', error);
      return res.status(500).json({ error: 'Erro ao buscar os dados.' });
    }
  },  
  // Criar uma nova associação entre disciplina e curso
  async criar(req, res) {
    const { id_disciplina, id_curso } = req.body;

    try {
      const novaAssociacao = await DisciplinasCurso.create({
        id_disciplina,
        id_curso,
      });

      return res.status(201).json(novaAssociacao);
    } catch (error) {
      console.error('Erro ao criar associação:', error);
      return res.status(500).json({ error: 'Erro ao criar a associação.' });
    }
  },

  // Atualizar uma associação existente
  async atualizar(req, res) {
    const { id_disciplina, id_curso } = req.params;
    const novosDados = req.body;

    try {
      const associacao = await DisciplinasCurso.findOne({
        where: { id_disciplina, id_curso },
      });

      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada.' });
      }

      await associacao.update(novosDados);
      return res.status(200).json(associacao);
    } catch (error) {
      console.error('Erro ao atualizar associação:', error);
      return res.status(500).json({ error: 'Erro ao atualizar a associação.' });
    }
  },

  // Excluir uma associação
  async excluir(req, res) {
    const { id_disciplina, id_curso } = req.params;

    try {
      const associacao = await DisciplinasCurso.findOne({
        where: { id_disciplina, id_curso },
      });

      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada.' });
      }

      await associacao.destroy();
      return res.status(200).json({ message: 'Associação removida com sucesso.' });
    } catch (error) {
      console.error('Erro ao excluir associação:', error);
      return res.status(500).json({ error: 'Erro ao excluir a associação.' });
    }
  },
};

module.exports = disciplinasCursoController;
