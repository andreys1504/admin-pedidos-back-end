import { Response, Request } from 'express';
import { autenticacaoUsuarioServico } from '../../../apis/security/autenticacao-usuario.servico';
import { Notification } from '../../domain/notifications/notification';
import { ResponseApi } from './response-api';

export class BaseController {
    configRespostaSucesso = (resposta: Response, dados: any, statuCode: number) => {
        const dadosResposta: ResponseApi = {
            sucesso: true,
            dados,
            mensagens: []
        }

        resposta.status(statuCode).send(dadosResposta);
    }

    configRespostaErroValidacao = (resposta: Response, mensagens: Notification[]) => {
        const dadosResposta: ResponseApi = {
            sucesso: false,
            dados: '',
            mensagens
        }

        resposta.status(200).send(dadosResposta);
    }
        
    tokenAutenticacao = (requisicao: Request) => {
        return autenticacaoUsuarioServico.recuperarTokenRequisicao(requisicao);
    }
}
