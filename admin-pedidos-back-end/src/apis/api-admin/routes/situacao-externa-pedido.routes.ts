import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { CadastroSituacaoExternaPedidoController } from "../controllers/situacao-externa-pedido/cadastro/cadastro-situacao-externa-pedido.controller";
import { SituacoesExternasPedidoController } from "../controllers/situacao-externa-pedido/situacoes-externas-pedido/situacoes-externas-pedido.controller";
import { SituacoesExternasPedidoAtivasController } from "../controllers/situacao-externa-pedido/situacoes-externas-pedido-ativas/situacoes-externas-pedido-ativas.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesExternasPedidoController().handleAsync(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroSituacaoExternaPedidoController().handleAsync(routeContext)
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new SituacoesExternasPedidoAtivasController().handleAsync(routeContext)
  )
);

export default routes;
