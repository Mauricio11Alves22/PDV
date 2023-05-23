const knex = require("../conexao")

const cadastrarPedido = async (req, res) => {
    const { cliente_id, produto_id, quantidade_produto, observacao } = req.body

    try {

    const dadosPedido = await knex('pedidos').insert({
        cliente_id,
        observacao,
        valor_total: '',
    })

    const idPedido = await knex('pedidos').where({cliente_id}).select('id').first()
    const idProduto = await knex('produtos').where({produto_id}).select('id').first()
    const valorProduto = await knex('produtos').where({produto_id}).select('valor').first()

        const dadosPedido2 = await knex('pedidos_produtos').insert({
            pedido_id: idPedido,
            produto_id:idProduto,
            quantidade_produto: quantidade_produto,
            valor_produto: valorProduto
        })

        return res.status(201).json(dadosPedido, dadosPedido2)
    } catch (error) {
        return res.status(500).json({mensagem: error.messege})
    }
}//pendente


module.exports = {
    cadastrarPedido
}