import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { SituacoesInternasItemPedidoAtivasController } from '../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.controller';
import { CadastroSituacaoInternaItemPedidoController } from '../controllers/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.controller';
import { SituacoesInternasItemPedidoController } from '../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesInternasItemPedidoController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroSituacaoInternaItemPedidoController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesInternasItemPedidoAtivasController().executar(contexto)));

export default rotas;