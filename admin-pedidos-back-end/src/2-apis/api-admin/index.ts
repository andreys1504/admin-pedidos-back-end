import 'reflect-metadata';
import dotenv from 'dotenv';

import { AmbientesAplicacao } from '../../0-core/configuracoes-aplicacoes/ambientes-aplicacao.app';
const ambiente = process.env.CURRENT_ENVIRONMENT || AmbientesAplicacao.DESENVOLVIMENTO_LOCAL;
if (ambiente === AmbientesAplicacao.DESENVOLVIMENTO_LOCAL)
    dotenv.config();

import { conectarBancoDados } from '../../1-infra/dados/banco-dados/conexao-banco-dados.app';
import App from './app';
import { ConfiguracoesApiAdminApp } from './configs/configuracoes-api-admin.app';

conectarBancoDados(process.env);
const servidor = new App().servidor; 

console.log('');
console.log('');
console.log('ambiente: ' + ambiente);

const portaAcessoApp = process.env.PORT || ConfiguracoesApiAdminApp.API_FRONT_END_WEB_ADMIN_PORTA_LOCAL;
servidor.listen(portaAcessoApp, () => { 
    console.log('===API FRONT END WEB ADMIN===');
    console.log('porta: ' + portaAcessoApp + '\n--\n\n')
});