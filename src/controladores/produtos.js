const knex = require("../conexao")

const listarCategoria = async (req,res) => {
    const resultado = await knex('categorias').select('descricao')
    try {
        return res.json({resultado})
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        
        const resultado = await knex('produtos').insert({
            descricao, 
            quantidade_estoque, 
            valor, 
            categoria_id
        }).returning('*')

        return res.status(201).json(resultado)
        
    } catch (error) {
        return res.status(500).json({mensagem : error.message})
    }
    
    
}//ok

const atualizarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id: idProduto } = req.params
    
    try {

        const resultado = await knex('produtos').where({id: idProduto}).first()
        
        if (!resultado){
            return res.status(403).json({mensagem: "Produto não encontrado."})
        }

        const atualiza = await knex('produtos').update({
            descricao,  
            quantidade_estoque, 
            valor,
            categoria_id
        }).returning('*')
        
        return res.status(204).json(atualiza)
        
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const detalharProduto = async (req, res) => {
    const { categoria_id } = req.query

    try {
        
        if (categoria_id){
            const resultado = await knex('produtos').where({categoria_id}).first()
            return res.status(200).json(resultado)
        }

        const resultado = await knex('produtos').select('*')

        return res.status(200).json(resultado)

    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const produtosUsuario = async (req, res) => {
    const { id } = req.params

    try {
    const resultado = await knex('produtos').where({ id }).first()
    if (!resultado){
        return res.status(403).json({mensagem: "Produto não encontrado."})
    }
        return res.status(200).json(resultado)    
    
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok

const excluirProduto = async (req, res) => {
    const { id } = req.params

    try {
    const resultado = await knex('produtos').where({ id }).first()
    if (!resultado){
        return res.status(403).json({mensagem: "Produto não encontrado."})
    }

    const apagar = await knex('produtos').where({ id }).del()
        return res.status(204).json()    
    
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }
}//ok
 
module.exports = {
    listarCategoria,
    cadastrarProduto,
    atualizarProduto,
    detalharProduto,
    produtosUsuario,
    excluirProduto
}