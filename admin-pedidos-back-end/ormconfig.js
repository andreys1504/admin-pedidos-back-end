const databaseConnectionOptions = require('./src/core/infra/data/database-connection-options');
const { Environments } = require('./src/core/configurations/environments');

const ambiente = process.env.CURRENT_ENVIRONMENT || Environments.DESENVOLVIMENTO_LOCAL;
if (ambiente === Environments.DESENVOLVIMENTO_LOCAL) {
    const dotenv = require('dotenv');
    dotenv.config();
}

export default databaseConnectionOptions(process.env);
