import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { CadastroSituacaoExternaPedidoController } from '../controllers/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.controller';
import { SituacoesExternasPedidoController } from '../controllers/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.controller';
import { SituacoesExternasPedidoAtivasController } from '../controllers/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesExternasPedidoController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroSituacaoExternaPedidoController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new SituacoesExternasPedidoAtivasController().executar(contexto)));

export default rotas;