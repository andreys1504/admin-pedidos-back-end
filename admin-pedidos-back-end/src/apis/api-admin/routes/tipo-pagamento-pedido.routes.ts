import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { TiposPagamentoController } from "../controllers/tipo-pagamento-pedido/tipos-pagamento/tipos-pagamento.controller";
import { CadastroTipoPagamentoPedidoController } from "../controllers/tipo-pagamento-pedido/cadastro/cadastro-tipo-pagamento-pedido.controller";
import { TiposPagamentoAtivosController } from "../controllers/tipo-pagamento-pedido/tipos-pagamento-ativos/tipos-pagamento-ativos.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposPagamentoController().handle(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroTipoPagamentoPedidoController().handle(routeContext)
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposPagamentoAtivosController().handle(routeContext)
  )
);

export default routes;
