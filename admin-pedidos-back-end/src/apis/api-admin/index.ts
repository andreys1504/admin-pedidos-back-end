import 'reflect-metadata';
import dotenv from 'dotenv';
import { Environments } from '../../core/configurations/environments';

const ambiente = process.env.CURRENT_ENVIRONMENT || Environments.DESENVOLVIMENTO_LOCAL;
if (ambiente === Environments.DESENVOLVIMENTO_LOCAL)
    dotenv.config();

import { databaseConnection } from '../../infra/data/database/database-connection';
import App from './app';
import { ConfiguracoesApiAdminApp } from './configs/configuracoes-api-admin.app';


databaseConnection(process.env);
const servidor = new App().servidor; 

console.log('');
console.log('');
console.log('ambiente: ' + ambiente);

const portaAcessoApp = process.env.PORT || ConfiguracoesApiAdminApp.API_ADMIN;
servidor.listen(portaAcessoApp, () => { 
    console.log('===API ADMIN===');
    console.log('porta: ' + portaAcessoApp + '\n--\n\n')
});
