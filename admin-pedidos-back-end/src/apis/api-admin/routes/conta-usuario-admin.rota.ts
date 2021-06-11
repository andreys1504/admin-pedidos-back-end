import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { AutenticacaoController } from '../controllers/conta-usuario-admin/autenticacao/autenticacao.controller';
import { ValidacaoTokenController } from '../controllers/conta-usuario-admin/validacao-token/validacao-token.controller';
import { AlteracaoSenhaController } from '../controllers/conta-usuario-admin/alteracao-senha/alteracao-senha.controller';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.post('/autenticar',
    catchErrors(async (contexto: RouteContext) => await new AutenticacaoController().executar(contexto)));

rotas.get('/validar-token',
    authorize(),
    catchErrors((contexto: RouteContext) => new ValidacaoTokenController().executar(contexto)));

rotas.post('/alterar-senha',
    authorize(),
    catchErrors(async (contexto: RouteContext) => await new AlteracaoSenhaController().executar(contexto)));

export default rotas;