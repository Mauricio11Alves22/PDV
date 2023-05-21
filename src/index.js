require('dotenv').config()
const express = require('express')
const cors = require('cors')
const rotas = require('./rotas')

const app = express()

app.use(cors())
app.use(express.json())
app.use(rotas)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
    console.log(process.env.SENHA_JWT)
})
 