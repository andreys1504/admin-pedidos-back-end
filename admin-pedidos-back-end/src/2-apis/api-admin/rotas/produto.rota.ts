import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { CadastroProdutoController } from '../controllers/produto/cadastro/cadastro-produto.controller';
import { ProdutosParaEdicaoController } from '../controllers/produto/produtos-para-edicao/produtos-para-edicao.controller';
import { EdicaoProdutoController } from '../controllers/produto/edicao/edicao-produto.controller';
import { ProdutosPorConteudoDescricaoController } from '../controllers/produto/produtos-por-conteudo-descricao/produtos-por-conteudo-descricao.controller';
import { ProdutosParaCadastroPedidoController } from '../controllers/produto/produtos-para-cadastro-pedido/produtos-para-cadastro-pedido.controller';

const rotas = express.Router();

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroProdutoController().executar(contexto)));

rotas.get('/descricao/:descricao',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new ProdutosPorConteudoDescricaoController().executar(contexto)));

rotas.get('/cadastro-pedido',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new ProdutosParaCadastroPedidoController().executar(contexto)));

rotas.get('/para-edicao',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new ProdutosParaEdicaoController().executar(contexto)));

rotas.put('/:id',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new EdicaoProdutoController().executar(contexto)));

export default rotas;