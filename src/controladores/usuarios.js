const knex = require('../conexao') 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaToken = process.env.SENHA_JWT

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    const senhaCriptografada = bcrypt.hashSync(senha, 10)
    
    try {
        if (req.email){
            return res.status(400).json({
                mensagem: "Já existe usuário cadastrado com o e-mail informado"
            })
        }
        const resultado = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriptografada
        }).returning('*')

        return res.status(201).json(resultado)

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const loginUsuario = async (req, res) => {
    const { senha } = req.body

    try {
        
        if (!req.email){
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)."})
        }
        const { senha: senhaUsuario, ...usuario } = req.email
        const verificarSenha = await bcrypt.compare(senha, senhaUsuario)
    
       if (!verificarSenha){
            return res.status(400).json({ mensagem: "Usuário e/ou senha inválido(s)." })
        }

        const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: '8h'})

        return res.status(200).json({usuario, token})

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const detalharUsuario = async (req, res) => {

    try {
        return res.status(200).json(req.usuario)
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario
    const { nome, email, senha } = req.body
    const senhaCriptografada = bcrypt.hashSync(senha, 10)
  
    try {
        
        if (req.email){
            return res.status(403).json({mensagem: "O e-mail informado já está sendo utilizado por outro usuário."})
    }

    const resultado = await knex('usuarios').where({id}).update({
        nome,
        email,
        senha:senhaCriptografada
    })

    return res.status(204).json({resultado})

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }


}//ok

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}