const express = require('express');
const {resolve} = require('path');
const db = require('./config/db');
// Rotas API
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const disciplinasCurso = require('./routes/disciplinasCursoRouter');
const alunosRoutes = require('./routes/alunosRoutes');
const responsavelRoutes = require('./routes/responsavelRoutes');
const professorRoutes = require('./routes/professorRoutes')
const adminRoutes = require('./routes/adminRoutes')

// Paginas
const gerenciarDisciplinas = require('./routes/gerenciarPagesRoutes');
const alunosPage = require('./routes/alunosPagesRoutes')
// env
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(express.static(resolve('./src/public')));
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', './src/views');
// Rotas
app.use('/api', disciplinaRoutes);
app.use('/api', cursosRoutes);
app.use('/api', disciplinasCurso);
app.use('/api', alunosRoutes);
app.use('/api', responsavelRoutes);
app.use('/api', professorRoutes);
app.use('/api', adminRoutes);
app.use('/gerenciar', gerenciarDisciplinas)
app.use('/alunos', alunosPage);


app.listen(process.env.PORTA, process.env.HOST, ()=>{
    console.log(`Servidor inicializado no endereço: http://${process.env.HOST}:${process.env.PORTA}`)
})