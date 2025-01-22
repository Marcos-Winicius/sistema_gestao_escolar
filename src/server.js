const express = require('express');
const {resolve} = require('path');
const db = require('./config/db');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const gerenciarDisciplinas = require('./routes/gerenciarDisciplinaRoutes');
const disciplinasCurso = require('./routes/disciplinasCursoRouter');

const app = express();
const port = 8080
const host = 'localhost'

app.use(express.json());
app.use(express.static(resolve('./src/public')));
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', './src/views');
// Rotas
app.use('/api', disciplinaRoutes);
app.use('/api', cursosRoutes);
app.use('/api', disciplinasCurso);
app.use('/gerenciar_disciplinas', gerenciarDisciplinas)

// app.get('/', (req, res)=>{
//     res.send('<h1>Teste</h1>')
// })

app.listen(port, host, ()=>{
    console.log(`Servidor inicializado no endereço: http://${host}:${port}`)
})