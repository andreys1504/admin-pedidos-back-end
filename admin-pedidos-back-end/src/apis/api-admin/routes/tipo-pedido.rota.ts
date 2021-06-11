import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { CadastroTipoPedidoController } from '../controllers/tipo-pedido/cadastro/cadastro-tipo-pedido.controller';
import { TiposPedidosController } from '../controllers/tipo-pedido/tipos-pedidos/tipos-pedidos.controller';
import { TiposPedidoAtivosController } from '../controllers/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposPedidosController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroTipoPedidoController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposPedidoAtivosController().executar(contexto)));

export default rotas;