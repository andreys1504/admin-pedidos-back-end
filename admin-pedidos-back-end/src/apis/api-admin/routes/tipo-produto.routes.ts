import express from 'express';

import { authorize } from '../configurations/routes/security/authorize';
import { RouteContext } from '../configurations/routes/route-context';
import { TiposProdutoCadastradosController } from '../controllers/tipo-produto/tipos-produto/tipos-produto-cadastrados.controller';
import { TiposProdutoAtivosController } from '../controllers/tipo-produto/tipos-produto-ativos/tipos-produto-ativos.controller';
import { catchErrorsRoute } from '../configurations/routes/catch-errors-route';

const routes = express.Router();

routes.get('/',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new TiposProdutoCadastradosController().handle(routeContext)));

routes.get('/ativos',
    authorize(),
    catchErrorsRoute(async (routeContext: RouteContext) => await new TiposProdutoAtivosController().handle(routeContext)));

export default routes;