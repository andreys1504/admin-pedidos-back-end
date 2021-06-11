import express from 'express';

import { authorize } from '../../../core/apis/routes/authorize';
import { catchErrors } from '../../../core/apis/routes/errors-route.handler';
import { RouteContext } from '../../../core/apis/routes/route-context';

const rotas = express.Router();

rotas.get('/',
    authorize(),
    catchErrors((contexto: RouteContext) => {
        contexto.resposta.status(200).send({
            descricao: 'API FRONT END WEB ADMIN',
            versao: '1.0.0'
        });
    })
);

export default rotas;