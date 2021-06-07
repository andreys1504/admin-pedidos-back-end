import express from 'express';

import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { CadastroClienteController } from '../controllers/cliente/cadastro/cadastro-cliente.controller';
import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ClientesParaCadastroPedidoController } from '../controllers/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.controller';
import { ClientesParaEdicaoDadosController } from '../controllers/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.controller';
import { EdicaoClienteController } from '../controllers/cliente/edicao/edicao-cliente.controller';

const rotas = express.Router();

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => new CadastroClienteController().executar(contexto)));

rotas.get('/clientes-cadastro-pedido/:nomeCpfCnpj',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => new ClientesParaCadastroPedidoController().executar(contexto)));

rotas.get('/para-edicao/:nomeCpfCnpj',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => new ClientesParaEdicaoDadosController().executar(contexto)));

rotas.put('/:id',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => new EdicaoClienteController().executar(contexto)));

export default rotas;