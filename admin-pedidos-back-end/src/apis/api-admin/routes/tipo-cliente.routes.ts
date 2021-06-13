import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { TiposClienteController } from "../controllers/tipo-cliente/tipos-cliente/tipos-cliente.controller";
import { CadastroTipoClienteController } from "../controllers/tipo-cliente/cadastro/cadastro-tipo-cliente.controller";
import { TiposClienteAtivosController } from "../controllers/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.get(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposClienteController().handleAsync(routeContext)
  )
);

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroTipoClienteController().handleAsync(routeContext)
  )
);

routes.get(
  "/ativos",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new TiposClienteAtivosController().handleAsync(routeContext)
  )
);

export default routes;
