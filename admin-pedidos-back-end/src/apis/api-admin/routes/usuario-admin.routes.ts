import express from 'express';

import { authorize } from '../configurations/routes/security/authorize';
import { RouteContext } from '../configurations/routes/route-context';
import { UsuariosAdminController } from '../controllers/usuario-admin/usuarios-cadastrados/usuarios-admin-cadastrados.controller';
import { CadastroUsuarioAdminController } from '../controllers/usuario-admin/cadastro/cadastro-usuario-admin.controller';
import { EdicaoUsuarioAdminController } from '../controllers/usuario-admin/edicao/edicao-usuario-admin.controller';
import { DesativacaoUsuarioAdminController } from '../controllers/usuario-admin/desativacao/desativacao-usuario-admin.controller';
import { AtivacaoUsuarioAdminController } from '../controllers/usuario-admin/ativacao/ativacao-usuario-admin.controller';
import { UserRoles } from '../../../core/configurations/user-roles';
import { catchErrorsRoute } from '../configurations/routes/catch-errors-route';

const routes = express.Router();

routes.get('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrorsRoute(async (routeContext: RouteContext) => await new UsuariosAdminController().handle(routeContext)));

routes.post('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrorsRoute(async (routeContext: RouteContext) => await new CadastroUsuarioAdminController().handle(routeContext)));

routes.put('/',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrorsRoute(async (routeContext: RouteContext) => await new EdicaoUsuarioAdminController().handle(routeContext)));

routes.put('/desativar/:id',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrorsRoute(async (routeContext: RouteContext) => await new DesativacaoUsuarioAdminController().handle(routeContext)));

routes.put('/ativar/:id',
    authorize(UserRoles.USUARIO.CADASTRO_USUARIO),
    catchErrorsRoute(async (routeContext: RouteContext) => await new AtivacaoUsuarioAdminController().handle(routeContext)));

export default routes;
