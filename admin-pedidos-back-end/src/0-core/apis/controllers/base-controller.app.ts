import { Response, Request } from 'express';

import { ResultadoValidacaoDadosModel } from '../../dominio/resultado-validacao-dados.model';
import { autenticacaoUsuarioServico } from '../../../1-infra/servicos/autenticacao-usuario/autenticacao-usuario.servico';
import { RespostaApi } from './resposta-api.model';

export class BaseControllerApp {
    configRespostaSucesso = (resposta: Response, dados: any, statuCode: number) => {
        const dadosResposta: RespostaApi = {
            sucesso: true,
            dados,
            mensagens: []
        }

        resposta.status(statuCode).send(dadosResposta);
    }

    configRespostaErroValidacao = (resposta: Response, mensagens: ResultadoValidacaoDadosModel[]) => {
        const dadosResposta: RespostaApi = {
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