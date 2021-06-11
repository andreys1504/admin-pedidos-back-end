import express from 'express';

import { authorize } from '../configurations/routes/security/authorize';
import { catchErrorsRoute } from '../configurations/routes/catch-errors-route';
import { RouteContext } from '../configurations/routes/route-context';

const routes = express.Router();

routes.get('/',
    authorize(),
    catchErrorsRoute((routeContext: RouteContext) => {
        routeContext.response.status(200).send({
            descricao: 'API FRONT END WEB ADMIN',
            versao: '1.0.0'
        });
    })
);

export default routes;