import request from 'supertest';

import App from '../../../../src/2-apis/api-front-end-web-admin/app';
import { RespostaApi } from '../../../../src/0-core/apis/controllers/resposta-api.model';
import { limpezaDadosInicioTeste } from '../../../helpers';

describe('autenticação - sucesso', () => {
    const urlServico = '/conta-usuario/autenticar';
    let app: App;

    beforeEach(async () => {
        app = new App();
        await limpezaDadosInicioTeste();
    });

    it('dados retorno', async () => {
        //arrange
        const dadosAutenticacao = {
            nomeUsuario: 'andreys1504',
            senha: '123456'
        };

        //act
        const response = await request(app.servidor)
            .post(urlServico)
            .send(dadosAutenticacao);

        const dadosResposta = response.body as RespostaApi;

        //assert
        expect(true).toBe(dadosResposta.sucesso);
        expect(true).toBe(dadosResposta.dados.token ? true : false);
        expect(true).toBe(dadosResposta.dados.nome ? true : false);
        expect(true).toBe(dadosResposta.dados.idUsuario ? true : false);
        expect(true).toBe(dadosResposta.dados.nomeUsuario ? true : false);
        expect(true).toBe(typeof dadosResposta.dados.necessarioAlteracaoSenha === 'boolean');
    });
});