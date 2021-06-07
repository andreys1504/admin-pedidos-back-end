import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { SituacoesExternasItemPedidoController } from '../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.controller';
import { CadastroSituacaoExternaItemPedidoController } from '../controllers/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.controller';
import { SituacoesExternasItemPedidoAtivasController } from '../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesExternasItemPedidoController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroSituacaoExternaItemPedidoController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesExternasItemPedidoAtivasController().executar(contexto)));

export default rotas;