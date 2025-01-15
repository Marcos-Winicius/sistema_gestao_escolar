const express = require('express');
const db = require('./config/db')
const app = express();

const port = 8080
const host = 'localhost'

app.get('/', (req, res)=>{
    res.send('<h1>Teste</h1>')
})

app.listen(port, host, ()=>{
    console.log(`Servidor inicializado no endereço: http://${host}:${port}`)
})