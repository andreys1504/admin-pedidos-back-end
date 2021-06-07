import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { AutenticacaoController } from '../controllers/conta-usuario-admin/autenticacao/autenticacao.controller';
import { ValidacaoTokenController } from '../controllers/conta-usuario-admin/validacao-token/validacao-token.controller';
import { AlteracaoSenhaController } from '../controllers/conta-usuario-admin/alteracao-senha/alteracao-senha.controller';

const rotas = express.Router();

rotas.post('/autenticar',
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new AutenticacaoController().executar(contexto)));

rotas.get('/validar-token',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => new ValidacaoTokenController().executar(contexto)));

rotas.post('/alterar-senha',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new AlteracaoSenhaController().executar(contexto)));

export default rotas;