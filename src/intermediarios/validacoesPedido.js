const knex = require("../conexao");

const validarproduto_id = async (req, res, next) => {
    const { cliente_id, produto_id, quantidade_produto} = req.body

    try {
        if (!cliente_id){
            return res.status(400).json({ mensagem: 'Cliente não informado.' })
        }
        if (!produto_id){
            return res.status(400).json({ mensagem: 'produto não informado.' })
            }
        if (!quantidade_produto){
            return res.status(400).json({ mensagem: 'Quantidade de produtos não informado.' })
            }

        const verificarCliente = await knex('clientes').where({cliente_id}).first()
        const verificarproduto_id = await knex('produtos').where({produto_id})
        const vererificarQuant = await knex('produtos').where({produto_id}).select('quantidade_estoque').first()

        if (!verificarCliente){
            return res.status(400).json({ mensagem: 'Cliente não encontrado.' })
        }
        if (!verificarproduto_id){
            return res.status(400).json({ mensagem: 'produto não encontrado.' })
        }
        if (vererificarQuant < quantidade_produto){
            return res.status(400).json({ mensagem: `Quantidade do produto em estoque insuficiente!
             quantidade_produto total de ${vererificarQuant}` })
        }
        

        next()
    } catch (error) {
        return res.status(500).json({mensagem: error.message})
    }

}//pendente




module.exports = {
    validarproduto_id
}