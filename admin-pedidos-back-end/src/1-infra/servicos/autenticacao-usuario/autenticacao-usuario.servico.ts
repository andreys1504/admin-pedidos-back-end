import { Request } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

import { ContextoRota } from '../../../0-core/apis/rotas/contexto-rota';
import { ConfiguracoesGlobaisApp } from '../../../0-core/configuracoes-aplicacoes/configuracoes-globais.app';

const autorizarAcessoRota = (
    contexto: ContextoRota,
    chavePermissao: string = '') => {
    const token = recuperarTokenRequisicao(contexto.requisicao);

    if (!token)
        contexto.resposta.status(401).json({ mensagem: 'Acesso Restrito' });
    else
        jwt.verify(token, <string>ConfiguracoesGlobaisApp.APIS_SALT_KEY, (erro: any, decoded: any) => {
            if (erro)
                contexto.resposta.status(401).json({ mensagem: 'Token Inválido' });
            else {
                if (!chavePermissao)
                    contexto.avancar();
                else {
                    if (decoded.permissoes.includes(chavePermissao))
                        contexto.avancar();
                    else
                        contexto.resposta.status(403).json({ mensagem: 'Você não possui permissão de acesso a esta funcionalidade' });
                }
            }
        });
}

const recuperarTokenRequisicao = (requisicao: Request) => {
    return requisicao.body.token
        || requisicao.query.token
        || requisicao.headers['x-access-token'];
}

const gerarSenhaCodificada = (senha: string) => {
    return md5(senha + <string>ConfiguracoesGlobaisApp.APIS_SALT_KEY);
}

export const autenticacaoUsuarioServico = {
    autorizarAcessoRota,
    recuperarTokenRequisicao,
    gerarSenhaCodificada
}