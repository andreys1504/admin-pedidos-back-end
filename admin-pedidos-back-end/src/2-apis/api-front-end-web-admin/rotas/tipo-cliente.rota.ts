import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { TiposClienteController } from '../controllers/tipo-cliente/tipos-cliente/tipos-cliente.controller';
import { CadastroTipoClienteController } from '../controllers/tipo-cliente/cadastro/cadastro-tipo-cliente.controller';
import { TiposClienteAtivosController } from '../controllers/tipo-cliente/tipos-cliente-ativos/tipos-cliente-ativos.controller';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposClienteController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroTipoClienteController().executar(contexto)));

rotas.get('/ativos',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new TiposClienteAtivosController().executar(contexto)));

export default rotas;