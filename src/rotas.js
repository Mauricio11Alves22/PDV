const express = require('express')
const { listarCategoria, cadastrarProduto, atualizarProduto, detalharProduto, produtosUsuario, excluirProduto } = require('./controladores/produtos')
const { campoNome, campoEmailSenha, emailExiste, verificarToken, campoEmailCpf, cpfExiste } = require('./intermediarios/validacoesUsuario')
const { cadastrarUsuario, loginUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios')
const { itensObrigatorios, validarCategoria } = require('./intermediarios/validacoesProdutos')
const { cadastrarCliente, atualizarCliente, detalharClientes, detalharClientePorId } = require('./controladores/clientes')
const { validarPedido } = require('./intermediarios/validacoesPedido')
const { cadastrarPedido } = require('./controladores/pedidos')
const rotas = express.Router()

rotas.get('/categoria', listarCategoria)
rotas.post('/usuario', campoNome, campoEmailSenha, emailExiste, cadastrarUsuario)
rotas.post('/login', campoEmailSenha, emailExiste, loginUsuario)
rotas.use(verificarToken)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', campoNome, campoEmailSenha, emailExiste, atualizarUsuario)
rotas.post('/produto', itensObrigatorios, validarCategoria, cadastrarProduto)
rotas.put('/produto/:id', itensObrigatorios, validarCategoria, atualizarProduto)
rotas.get('/produto', detalharProduto)
rotas.get('/produto/:id', produtosUsuario)
rotas.delete('/produto/:id', excluirProduto)
rotas.post('/cliente',campoNome, campoEmailCpf, emailExiste, cpfExiste, cadastrarCliente)
rotas.put('/cliente/:id',campoNome, campoEmailCpf, emailExiste, cpfExiste, atualizarCliente)
rotas.get('/cliente', detalharClientes)
rotas.get('/cliente/:id', detalharClientePorId)
//rotas.post('/pedido', validarPedido, cadastrarPedido )

module.exports = rotas
 