import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { CadastroProdutoController } from '../controllers/produto/cadastro/cadastro-produto.controller';
import { ProdutosParaEdicaoController } from '../controllers/produto/produtos-para-edicao/produtos-para-edicao.controller';
import { EdicaoProdutoController } from '../controllers/produto/edicao/edicao-produto.controller';
import { ProdutosPorConteudoDescricaoController } from '../controllers/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.controller';
import { ProdutosParaCadastroPedidoController } from '../controllers/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroProdutoController().executar(contexto)));

rotas.get('/descricao/:descricao',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new ProdutosPorConteudoDescricaoController().executar(contexto)));

rotas.get('/cadastro-pedido',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new ProdutosParaCadastroPedidoController().executar(contexto)));

rotas.get('/para-edicao',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new ProdutosParaEdicaoController().executar(contexto)));

rotas.put('/:id',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new EdicaoProdutoController().executar(contexto)));

export default rotas;