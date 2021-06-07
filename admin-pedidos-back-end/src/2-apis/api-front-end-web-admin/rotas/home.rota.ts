import express from 'express';

import { validarAutorizacaoAcessoRota, capturarErrosExecucaoOperacaoRota } from '../../../0-core/apis/rotas/validacao-funcao-rota';
import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';

const rotas = express.Router();

rotas.get('/',
    validarAutorizacaoAcessoRota(),
    capturarErrosExecucaoOperacaoRota((contexto: ContextoRota) => {
        contexto.resposta.status(200).send({
            descricao: 'API FRONT END WEB ADMIN',
            versao: '1.0.0'
        });
    })
);

export default rotas;