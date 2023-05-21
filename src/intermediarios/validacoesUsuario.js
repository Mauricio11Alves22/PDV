const knex = require('../conexao')
const jwt = require('jsonwebtoken')
const senhaToken = process.env.SENHA_JWT  

const campoNome = async (req, res, next) => {
    const { nome } = req.body

try {
    if (!nome){
        return res.status(400).json({mensagem: 'Nome obrigatorio'})
    }
    next()
} catch (error) {
    return res.status(500).json({mensagem : error.messege})
}
}//ok

const campoEmailSenha = async (req, res, next) => {
    const { email, senha } = req.body

try {    
    if (!email){
        return res.status(400).json({mensagem: 'Email obrigatorio'})
    }
    if (!senha){
        return res.status(400).json({mensagem: 'Senha obrigatoria'})
    }
    next()
} catch (error) {
    return res.status(500).json({mensagem : error.messege})
}
    
}//ok

const emailExiste = async (req, res, next) => {
    const { email } = req.body

try {
    const resultado = await knex('usuarios').where({email}).first()
    req.email = resultado

    next()
} catch (error) {
    return res.status(500).json({mensagem : error.messege})
}    
}//ok

const verificarToken = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({mensagem : "Para acessar este recurso um token de autenticação válido deve ser enviado."})
    }

    const token = authorization.split(' ')[1]
    
    try {   

        const { id } = jwt.verify(token, senhaToken)
        const resultado = await knex('usuarios').where({id}).first()

        if(!resultado){
            return res.status(401).json({mensagem : "Para acessar este recurso um token de autenticação válido deve ser enviado."})
        }

        const { senha, ...usuario} = resultado

        req.usuario = usuario

        next()

    } catch (error) {
        return res.status(500).json({mensagem : error.message})
    }
}//ok

const campoEmailCpf = async (req, res, next) => {
    const { email, cpf } = req.body

try {    
    if (!email){
        return res.status(400).json({mensagem: 'Email obrigatorio'})
    }
    if (!cpf){
        return res.status(400).json({mensagem: 'CPF obrigatorio'})
    }
    next()
} catch (error) {
    return res.status(500).json({mensagem : error.messege})
}
    
}//ok

const cpfExiste = async (req, res, next) => {
   const { cpf } = req.body

try {
    const resultadoCpf = await knex('clientes').where({cpf}).first()

    req.cpf = resultadoCpf

    next()
} catch (error) {
    return res.status(500).json({mensagem : error.messege})
}    
}//ok


module.exports = {
    campoNome,
    campoEmailSenha,
    emailExiste,
    verificarToken,
    campoEmailCpf,
    cpfExiste
}

