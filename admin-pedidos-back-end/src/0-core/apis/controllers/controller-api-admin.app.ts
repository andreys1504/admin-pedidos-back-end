import { Request, Response } from 'express';

import { ConfiguracoesGlobaisApp } from '../../configuracoes-aplicacoes/configuracoes-globais.app';
import { autenticacaoUsuarioAdminServico } from '../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario-admin/autenticacao-usuario-admin.servico';
import { BaseControllerApp } from './base-controller.app';
import { ResultadoServicoAplicacao } from '../../dominio/aplicacao/resultado-servico-aplicacao';
import { StatusCodeRespostas } from './status-code-respostas.app';

export class ControllerApiAdminApp extends BaseControllerApp {
    dadosTokenAutenticacaoUsuarioAdmin = (requisicao: Request) => {
        return autenticacaoUsuarioAdminServico
            .decodificarToken(this.tokenAutenticacao(requisicao), ConfiguracoesGlobaisApp.APIS_SALT_KEY);
    }

    resultadoController<TResultadoServico>( 
        resposta: Response, 
        resultadoServico: ResultadoServicoAplicacao<TResultadoServico>,
        statusCodeSucesso: StatusCodeRespostas 
    ) {
        if (!resultadoServico.sucesso) {
            this.configRespostaErroValidacao(resposta, resultadoServico.mensagens);
            return;
        }

        this.configRespostaSucesso(resposta, resultadoServico.dados, +statusCodeSucesso);
    }
}