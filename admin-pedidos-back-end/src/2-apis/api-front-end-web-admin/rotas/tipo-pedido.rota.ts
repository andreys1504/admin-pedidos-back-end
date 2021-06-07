import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { CadastroTipoPedidoController } from '../controllers/tipo-pedido/cadastro/cadastro-tipo-pedido.controller';
import { TiposPedidosController } from '../controllers/tipo-pedido/tipos-pedidos/tipos-pedidos.controller';
import { TiposPedidoAtivosController } from '../controllers/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposPedidosController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroTipoPedidoController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposPedidoAtivosController().executar(contexto)));

export default rotas;