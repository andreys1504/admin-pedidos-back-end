import request from 'supertest';

import App from '../../../../src/2-apis/api-front-end-web-admin/app';
import { RespostaApi } from '../../../../src/0-core/apis/controllers/resposta-api.model';
import { limpezaDadosInicioTeste } from '../../../helpers';

describe('autenticação - falha', () => {
    const urlServico = '/conta-usuario/autenticar';
    let app: App;

    beforeEach(async () => {
        app = new App();
        await limpezaDadosInicioTeste();
    });

    it('senha inválida', async () => {
        //arrange
        const dadosAutenticacao = {
            nomeUsuario: 'andreys1504',
            senha: '111'
        };

        //act
        const response = await request(app.servidor)
            .post(urlServico)
            .send(dadosAutenticacao);

        //assert
        expect(false).toBe((response.body as RespostaApi).sucesso);
    });
});