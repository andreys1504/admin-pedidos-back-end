import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { TiposProdutoCadastradosController } from '../controllers/tipo-produto/tipos-produto/tipos-produto-cadastrados.controller';
import { TiposProdutoAtivosController } from '../controllers/tipo-produto/tipos-produto-ativos/tipos-produto-ativos.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposProdutoCadastradosController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposProdutoAtivosController().executar(contexto)));

export default rotas;