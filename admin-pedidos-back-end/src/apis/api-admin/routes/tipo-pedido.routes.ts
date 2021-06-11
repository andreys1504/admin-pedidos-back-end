import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { CadastroTipoPedidoController } from "../controllers/tipo-pedido/cadastro/cadastro-tipo-pedido.controller";
import { TiposPedidosController } from "../controllers/tipo-pedido/tipos-pedidos/tipos-pedidos.controller";
import { TiposPedidoAtivosController } from "../controllers/tipo-pedido/tipos-pedido-ativos/tipos-pedido-ativos.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposPedidosController().handle(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroTipoPedidoController().handle(routeContext)
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposPedidoAtivosController().handle(routeContext)
  )
);

export default routes;
