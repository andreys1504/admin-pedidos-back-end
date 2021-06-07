import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { TiposProdutoCadastradosController } from '../controllers/tipo-produto/tipos-produto/tipos-produto-cadastrados.controller';
import { TiposProdutoAtivosController } from '../controllers/tipo-produto/tipos-produto-ativos/tipos-produto-ativos.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposProdutoCadastradosController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposProdutoAtivosController().executar(contexto)));

export default rotas;