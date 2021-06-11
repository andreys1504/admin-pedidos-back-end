import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { SituacoesExternasItemPedidoController } from '../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.controller';
import { CadastroSituacaoExternaItemPedidoController } from '../controllers/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.controller';
import { SituacoesExternasItemPedidoAtivasController } from '../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesExternasItemPedidoController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroSituacaoExternaItemPedidoController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesExternasItemPedidoAtivasController().executar(contexto)));

export default rotas;