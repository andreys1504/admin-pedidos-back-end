import 'reflect-metadata';
import dotenv from 'dotenv';
import { Environments } from '../../core/configurations/environments';

const environment = process.env.CURRENT_ENVIRONMENT || Environments.DESENVOLVIMENTO_LOCAL;
if (environment === Environments.DESENVOLVIMENTO_LOCAL)
    dotenv.config();

import { databaseConnection } from '../../infra/data/database/database-connection';
import App from './configurations/app';
import { apiSettings } from './configurations/api-settings';

databaseConnection(process.env);
const server = new App().server; 

console.log('');
console.log('');
console.log('ambiente: ' + environment);

const port = process.env.PORT || apiSettings.API_ADMIN_PORT;
server.listen(port, () => { 
    console.log('===API ADMIN===');
    console.log('porta: ' + port + '\n--\n\n')
});
