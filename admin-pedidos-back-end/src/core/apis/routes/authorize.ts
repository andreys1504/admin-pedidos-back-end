import { Request, Response, NextFunction } from 'express';
import { autenticacaoUsuarioServico } from '../../../apis/security/autenticacao-usuario.servico';

export const authorize = (permissao: string = '') =>
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
