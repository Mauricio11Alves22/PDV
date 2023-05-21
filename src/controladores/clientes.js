const knex = require("../conexao")


const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        if (req.email){
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o e-mail informado"})
        }
        if (req.cpf){
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o CPF informado"})
        }
    
        const cadastro = await knex('clientes').insert({
            nome, 
            email, 
            cpf, 
            cep, 
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado
        }).returning('*')
    
        return res.status(201).json(cadastro)

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
   
}//ok

const atualizarCliente = async (req, res) => {
    const { id } = req.params
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        if (req.email){
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o e-mail informado"})
        }
        if (req.cpf){
            return res.status(400).json({mensagem: "Já existe usuário cadastrado com o CPF informado"})
        }
    
        const cadastro = await knex('clientes').where({id}).update({
            nome, 
            email, 
            cpf, 
            cep, 
            rua, 
            numero, 
            bairro, 
            cidade, 
            estado
        })
    
        return res.status(204).json(cadastro)

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
   
}//ok

const detalharClientes = async (req, res) => {

    try {

        const cliente = await knex('clientes').select('*')
        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const detalharClientePorId = async (req, res) => {
    const { id } = req.params

    try {
        const cliente = await knex('clientes').where({ id }).first()
        if (!cliente){
            return res.status(404).json({mensagem: "Cliente não encontrado"})
        }
        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok



module.exports = {
    cadastrarCliente,
    atualizarCliente,
    detalharClientes,
    detalharClientePorId
}