import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { PedidosParaTratamentoController } from '../controllers/pedido/pedidos-para-tratamento/pedidos-para-tratamento.controller';
import { CadastroPedidoController } from '../controllers/pedido/cadastro/cadastro-pedido.controller';
import { EdicaoPedidoController } from '../controllers/pedido/edicao/edicao-pedido.controller';
import { PedidosCadastradosController } from '../controllers/pedido/pedidos-cadastrados/pedidos-cadastrados.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new PedidosCadastradosController().executar(contexto)));

rotas.get('/pedidos-para-tratamento',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new PedidosParaTratamentoController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroPedidoController().executar(contexto)));

rotas.put('/:id',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new EdicaoPedidoController().executar(contexto)));
    
export default rotas;