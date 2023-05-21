const knex = require("../conexao")


const itensObrigatorios = async (req, res, next) => {
    const { descricao, quantidade_estoque, valor, categoria_id} = req.body

try {
    if (!descricao){
        return res.status(400).json({mensagem: 'Descrição obrigatoria'})
    }
    if (!quantidade_estoque){
        return res.status(400).json({mensagem: 'Data obrigatoria'})
    }
    if (!valor){
        return res.status(400).json({mensagem: 'Valor obrigatorio'})
    }
    if (!categoria_id){
        return res.status(400).json({mensagem: 'Id da categoria obrigatorio'})
    }

    next()

} catch (error) {
    return res.status(500).json({mensagem : error.message})
}
}//ok

const validarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body
    
    
    try {
        const resultado = await knex('categorias').where({id: categoria_id}).first()

        if (!resultado){
            return res.status(404).json({mensagem : "Categoria não existe"})
        }
        next()

    } catch (error) {
        return res.status(500).json({mensagem : error.mensage})
    }

}//ok

module.exports = {
    itensObrigatorios,
    validarCategoria
}