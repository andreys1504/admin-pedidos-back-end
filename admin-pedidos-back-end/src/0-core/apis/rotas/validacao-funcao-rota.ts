import { Request, Response, NextFunction } from 'express';

import { autenticacaoUsuarioServico } from '../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario.servico';

export const capturarErrosExecucaoOperacaoRota = (funcao: any) =>
    (requisicao: Request, resposta: Response, avancar: NextFunction) => {
        Promise
            .resolve(funcao({ requisicao, resposta, avancar }))
            .catch(erro => {
                console.log('Erro em Controller');
                console.log(erro);
                erro.httpStatus = 500,
                    avancar(erro)
            })
    }

export const validarAutorizacaoAcessoRota = (permissao: string = '') =>
    (requisicao: Request, resposta: Response, avancar: NextFunction) => {
        Promise
            .resolve(permissao != ''
                ? autenticacaoUsuarioServico.autorizarAcessoRota({ requisicao, resposta, avancar }, permissao) 
                : autenticacaoUsuarioServico.autorizarAcessoRota({ requisicao, resposta, avancar }))
            .catch(erro => {
                erro.httpStatus = 500,
                    avancar(erro)
            })
    }