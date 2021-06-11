import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { TiposClienteController } from '../controllers/tipo-cliente/tipos-cliente/tipos-cliente.controller';
import { CadastroTipoClienteController } from '../controllers/tipo-cliente/cadastro/cadastro-tipo-cliente.controller';
import { TiposClienteAtivosController } from '../controllers/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposClienteController().executar(contexto)));

rotas.post('/',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new CadastroTipoClienteController().executar(contexto)));

rotas.get('/ativos',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new TiposClienteAtivosController().executar(contexto)));

export default rotas;