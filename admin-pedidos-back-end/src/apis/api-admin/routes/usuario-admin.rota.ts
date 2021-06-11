import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { RouteContext } from '../../../core/apis/routes/route-context';
import { UsuariosAdminController } from '../controllers/usuario-admin/usuarios-cadastrados/usuarios-admin-cadastrados.controller';
import { CadastroUsuarioAdminController } from '../controllers/usuario-admin/cadastro/cadastro-usuario-admin.controller';
import { EdicaoUsuarioAdminController } from '../controllers/usuario-admin/edicao/edicao-usuario-admin.controller';
import { DesativacaoUsuarioAdminController } from '../controllers/usuario-admin/desativacao/desativacao-usuario-admin.controller';
import { AtivacaoUsuarioAdminController } from '../controllers/usuario-admin/ativacao/ativacao-usuario-admin.controller';
import { UserRoles } from '../../../core/configurations/user-roles';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';

const rotas = express.Router();

rotas.get('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrors(async (contexto: RouteContext) => await new UsuariosAdminController().executar(contexto)));

rotas.post('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrors(async (contexto: RouteContext) => await new CadastroUsuarioAdminController().executar(contexto)));

rotas.put('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrors(async (contexto: RouteContext) => await new EdicaoUsuarioAdminController().executar(contexto)));

rotas.put('/desativar/:id',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrors(async (contexto: RouteContext) => await new DesativacaoUsuarioAdminController().executar(contexto)));

rotas.put('/ativar/:id',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrors(async (contexto: RouteContext) => await new AtivacaoUsuarioAdminController().executar(contexto)));

export default rotas;