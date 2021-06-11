import express from 'express';

import { CadastroClienteController } from '../controllers/cliente/cadastro/cadastro-cliente.controller';
import { ClientesParaCadastroPedidoController } from '../controllers/cliente/clientes-para-cadastro-pedido/clientes-para-cadastro-pedido.controller';
import { ClientesParaEdicaoDadosController } from '../controllers/cliente/clientes-para-edicao-dados/clientes-para-edicao-dados.controller';
import { EdicaoClienteController } from '../controllers/cliente/edicao/edicao-cliente.controller';
import { RouteContext } from '../configurations/routes/route-context';
import { authorize } from '../configurations/routes/security/authorize';
import { catchErrorsRoute } from '../configurations/routes/catch-errors-route';

const routes = express.Router();

routes.post('/',
    authorize(),
    catchErrorsRoute((routeContext: RouteContext) => new CadastroClienteController().handle(routeContext)));

routes.get('/clientes-cadastro-pedido/:nomeCpfCnpj',
    authorize(),
    catchErrorsRoute((routeContext: RouteContext) => new ClientesParaCadastroPedidoController().handle(routeContext)));

routes.get('/para-edicao/:nomeCpfCnpj',
    authorize(),
    catchErrorsRoute((routeContext: RouteContext) => new ClientesParaEdicaoDadosController().handle(routeContext)));

routes.put('/:id',
    authorize(),
    catchErrorsRoute((routeContext: RouteContext) => new EdicaoClienteController().handle(routeContext)));

export default routes;