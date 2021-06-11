import express from "express";

import { authorize } from "../configurations/routes/security/authorize";
import { RouteContext } from "../configurations/routes/route-context";
import { CadastroProdutoController } from "../controllers/produto/cadastro/cadastro-produto.controller";
import { ProdutosParaEdicaoController } from "../controllers/produto/produtos-para-edicao/produtos-para-edicao.controller";
import { EdicaoProdutoController } from "../controllers/produto/edicao/edicao-produto.controller";
import { ProdutosPorConteudoDescricaoController } from "../controllers/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.controller";
import { ProdutosParaCadastroPedidoController } from "../controllers/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.controller";
import { catchErrorsRoute } from "../configurations/routes/catch-errors-route";

const routes = express.Router();

routes.post(
  "/",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new CadastroProdutoController().handle(routeContext)
  )
);

routes.get(
  "/descricao/:descricao",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new ProdutosPorConteudoDescricaoController().handle(routeContext)
  )
);

routes.get(
  "/cadastro-pedido",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new ProdutosParaCadastroPedidoController().handle(routeContext)
  )
);

routes.get(
  "/para-edicao",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new ProdutosParaEdicaoController().handle(routeContext)
  )
);

routes.put(
  "/:id",
  authorize(),
  catchErrorsRoute(
    async (routeContext: RouteContext) =>
      await new EdicaoProdutoController().handle(routeContext)
  )
);

export default routes;
