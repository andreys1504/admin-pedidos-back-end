import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { SituacoesExternasItemPedidoController } from "../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido/situacoes-externas-item-pedido.controller";
import { CadastroSituacaoExternaItemPedidoController } from "../controllers/situacao-externa-item-pedido/cadastro/cadastro-situacao-externa-item-pedido.controller";
import { SituacoesExternasItemPedidoAtivasController } from "../controllers/situacao-externa-item-pedido/situacoes-externas-item-pedido-ativas/situacoes-externas-item-pedido-ativas.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesExternasItemPedidoController().handleAsync(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroSituacaoExternaItemPedidoController().handleAsync(
        routeContext
      )
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesExternasItemPedidoAtivasController().handleAsync(
        routeContext
      )
  )
);

export default routes;
