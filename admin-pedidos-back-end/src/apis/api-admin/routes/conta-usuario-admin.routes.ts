import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { AutenticacaoController } from "../controllers/conta-usuario-admin/autenticacao/autenticacao.controller";
import { ValidacaoTokenController } from "../controllers/conta-usuario-admin/validacao-token/validacao-token.controller";
import { AlteracaoSenhaController } from "../controllers/conta-usuario-admin/alteracao-senha/alteracao-senha.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.post(
  "/autenticar",
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new AutenticacaoController().handleAsync(routeContext)
  )
);

routes.get(
  "/validar-token",
  authorize(),
  catchErrorsRoute((routeContext: RouteContext) =>
    new ValidacaoTokenController().handle(routeContext)
  )
);

routes.post(
  "/alterar-senha",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new AlteracaoSenhaController().handleAsync(routeContext)
  )
);

export default routes;
