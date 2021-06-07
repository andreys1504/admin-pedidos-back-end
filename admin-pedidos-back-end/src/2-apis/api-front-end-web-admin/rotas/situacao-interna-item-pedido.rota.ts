import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { SituacoesInternasItemPedidoAtivasController } from '../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.controller';
import { CadastroSituacaoInternaItemPedidoController } from '../controllers/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.controller';
import { SituacoesInternasItemPedidoController } from '../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesInternasItemPedidoController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroSituacaoInternaItemPedidoController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesInternasItemPedidoAtivasController().executar(contexto)));

export default rotas;