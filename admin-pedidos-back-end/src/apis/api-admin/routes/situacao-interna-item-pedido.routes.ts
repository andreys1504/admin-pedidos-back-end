import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { SituacoesInternasItemPedidoAtivasController } from "../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido-ativas/situacoes-internas-item-pedido-ativas.controller";
import { CadastroSituacaoInternaItemPedidoController } from "../controllers/situacao-interna-item-pedido/cadastro/cadastro-situacao-interna-item-pedido.controller";
import { SituacoesInternasItemPedidoController } from "../controllers/situacao-interna-item-pedido/situacoes-internas-item-pedido/situacoes-internas-item-pedido.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesInternasItemPedidoController().handle(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroSituacaoInternaItemPedidoController().handle(
        routeContext
      )
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesInternasItemPedidoAtivasController().handle(
        routeContext
      )
  )
);

export default routes;
