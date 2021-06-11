import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { CadastroSituacaoExternaPedidoController } from '../controllers/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.controller';
import { SituacoesExternasPedidoController } from '../controllers/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.controller';
import { SituacoesExternasPedidoAtivasController } from '../controllers/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesExternasPedidoController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroSituacaoExternaPedidoController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new SituacoesExternasPedidoAtivasController().executar(contexto)));

export default rotas;