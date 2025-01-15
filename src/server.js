const express = require('express');
const {resolve} = require('path');
const db = require('./config/db');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const gerenciarDisciplinas = require('./routes/gerenciarDisciplinaRoutes');

const app = express();
const port = 8080
const host = 'localhost'

app.use(express.json());
app.use(express.static(resolve('./src/public')));

app.set('view engine', 'ejs');
app.set('views', './src/views');
// Rotas
app.use('/disciplinas', disciplinaRoutes);
app.use('/gerenciar_disciplinas', gerenciarDisciplinas)

// app.get('/', (req, res)=>{
//     res.send('<h1>Teste</h1>')
// })

app.listen(port, host, ()=>{
    console.log(`Servidor inicializado no endereço: http://${host}:${port}`)
})