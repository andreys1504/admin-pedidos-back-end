import express from 'express';

import { authorize } from '../configurations/routes/security/authorize';
import { RouteContext } from '../configurations/routes/route-context';
import { PedidosParaTratamentoController } from '../controllers/pedido/pedidos-para-tratamento/pedidos-para-tratamento.controller';
import { CadastroPedidoController } from '../controllers/pedido/cadastro/cadastro-pedido.controller';
import { EdicaoPedidoController } from '../controllers/pedido/edicao/edicao-pedido.controller';
import { PedidosCadastradosController } from '../controllers/pedido/pedidos-cadastrados/pedidos-cadastrados.controller';
import { catchErrorsRoute } from '../configurations/routes/catch-errors-route';

const routes = express.Router();

routes.get('/',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new PedidosCadastradosController().handle(routeContext)));

routes.get('/pedidos-para-tratamento',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new PedidosParaTratamentoController().handle(routeContext)));

routes.post('/',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new CadastroPedidoController().handle(routeContext)));

routes.put('/:id',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new EdicaoPedidoController().handle(routeContext)));
    
export default routes;