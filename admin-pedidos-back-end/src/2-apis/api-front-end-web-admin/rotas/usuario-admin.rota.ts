import express from 'express';

import { capturarErrosExecucaoOperacaoRota, validarAutorizacaoAcessoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { UsuariosAdminController } from '../controllers/usuario-admin/usuarios-cadastrados/usuarios-admin-cadastrados.controller';
import { CadastroUsuarioAdminController } from '../controllers/usuario-admin/cadastro/cadastro-usuario-admin.controller';
import { EdicaoUsuarioAdminController } from '../controllers/usuario-admin/edicao/edicao-usuario-admin.controller';
import { DesativacaoUsuarioAdminController } from '../controllers/usuario-admin/desativacao/desativacao-usuario-admin.controller';
import { AtivacaoUsuarioAdminController } from '../controllers/usuario-admin/ativacao/ativacao-usuario-admin.controller';
import { PermissoesAcessoFuncionalidadesApp } from '../../../0-core/configuracoes-aplicacoes/permissoes-acesso-funcionalidades.app';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(PermissoesAcessoFuncionalidadesApp.USUARIO.CADASTRO_USUARIO),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new UsuariosAdminController().executar(contexto)));

rotas.post('/',
    validarAutorizacaoAcessoRota(PermissoesAcessoFuncionalidadesApp.USUARIO.CADASTRO_USUARIO),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new CadastroUsuarioAdminController().executar(contexto)));

rotas.put('/',
    validarAutorizacaoAcessoRota(PermissoesAcessoFuncionalidadesApp.USUARIO.CADASTRO_USUARIO),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new EdicaoUsuarioAdminController().executar(contexto)));

rotas.put('/desativar/:id',
    validarAutorizacaoAcessoRota(PermissoesAcessoFuncionalidadesApp.USUARIO.CADASTRO_USUARIO),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new DesativacaoUsuarioAdminController().executar(contexto)));

rotas.put('/ativar/:id',
    validarAutorizacaoAcessoRota(PermissoesAcessoFuncionalidadesApp.USUARIO.CADASTRO_USUARIO),
    capturarErrosExecucaoOperacaoRota(async (contexto: ContextoRota) => await new AtivacaoUsuarioAdminController().executar(contexto)));

export default rotas;