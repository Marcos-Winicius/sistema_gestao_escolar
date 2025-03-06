const Turmas = require('../models/turmasModel');
const Cursos = require('../models/cursosModel');

module.exports = {
    getAll: async (req, res) => {
        try {
            const turmas = await Turmas.findAll({ include: { model: Cursos, as: 'curso_turma' } });
            if (turmas.length > 0) {
                res.json(turmas);
            } else {
                res.status(404).json({ error: "Nenhuma turma foi encontrada!" });
            }
        } catch (error) {
            console.error("Erro ao buscar Turmas!", error);
            res.status(500).json({ error: "Erro ao buscar Turmas!" });
        }
    },
    
    getById: async (req, res) => {
        const { codigo } = req.params;
        if (!codigo) {
            return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
        }
        try {
            const turma = await Turmas.findByPk(codigo, { include: { model: Cursos, as: 'curso_turma' } });
            if (turma) {
                const turmaData = turma.get({ plain: true });
                const { curso_turma, ...rest } = turmaData;
                const formattedTurma = {...rest, ...curso_turma}
                res.json(formattedTurma);
            } else {
                res.status(404).json({ error: "Turma não encontrada!" });
            }
        } catch (error) {
            console.error("Erro ao buscar Turma!", error);
            res.status(500).json({ error: "Erro ao buscar Turma!" });
        }
    },
    
    create: async (req, res) => {
        try {
            const { nome, id_curso, ch, semestres, turno } = req.body;
            if (!id_curso) {
                return res.status(400).json({ error: "ID do curso é obrigatório!" });
            }
            
            // Verificar se o curso existe
            const curso = await Cursos.findByPk(id_curso);
            if (!curso) {
                return res.status(404).json({ error: "Curso não encontrado!" });
            }
            
            const anoAtual = new Date().getFullYear();
            const codigo = `${anoAtual}.${id_curso}.${turno[0]}`; // Exemplo: 2025.17015.V
            
            const novaTurma = await Turmas.create({ codigo, nome, id_curso, ch, semestres, turno });
            res.status(201).json({ msg: "Turma criada com sucesso!", turma: novaTurma });
        } catch (error) {
            console.error("Erro ao criar Turma!", error);
            res.status(500).json({ error: "Erro ao criar Turma!" });
        }
    },
    
    update: async (req, res) => {
        const { codigo } = req.params;
        if (!codigo) {
            return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
        }
        try {
            const turma = await Turmas.findByPk(codigo);
            if (turma) {
                await turma.update(req.body);
                res.status(200).json({ msg: "Turma atualizada com sucesso!", nova: turma });
            } else {
                res.status(404).json({ error: "Turma não encontrada!" });
            }
        } catch (error) {
            console.error("Erro ao atualizar Turma!", error);
            res.status(500).json({ error: "Erro ao atualizar Turma!" });
        }
    },
    
    delete: async (req, res) => {
        const { codigo } = req.params;
        if (!codigo) {
            return res.status(400).json({ error: "Parâmetro inválido ou ausente!" });
        }
        try {
            const turma = await Turmas.findByPk(codigo);
            if (!turma) {
                return res.status(404).json({ error: "Turma não encontrada!" });
            }
            await turma.destroy();
            res.status(200).json({ msg: "Turma excluída com sucesso!" });
        } catch (error) {
            console.error("Erro ao excluir Turma!", error);
            res.status(500).json({ error: "Erro ao excluir Turma!" });
        }
    }
};
