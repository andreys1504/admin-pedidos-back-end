import { Request, Response } from 'express';

import { GlobalSettings } from '../../configurations/global-settings';
import { BaseController } from './base-controller';
import { ResponseService } from '../../domain/application-services/response/response-service';
import { ResponseApiStatusCode } from './response-api-status-code';
import { autenticacaoUsuarioAdminServico } from '../../../apis/security/autenticacao-usuario-admin/autenticacao-usuario-admin.servico';

export class ControllerApiAdmin extends BaseController {
    dadosTokenAutenticacaoUsuarioAdmin = (requisicao: Request) => {
        return autenticacaoUsuarioAdminServico
            .decodificarToken(this.tokenAutenticacao(requisicao), GlobalSettings.APIS_SALT_KEY);
    }

    resultadoController<TResultadoServico>( 
        resposta: Response, 
        resultadoServico: ResponseService<TResultadoServico>,
        statusCodeSucesso: ResponseApiStatusCode 
    ) {
        if (!resultadoServico.sucesso) {
            this.configRespostaErroValidacao(resposta, resultadoServico.mensagens);
            return;
        }

        this.configRespostaSucesso(resposta, resultadoServico.dados, +statusCodeSucesso);
    }
}
