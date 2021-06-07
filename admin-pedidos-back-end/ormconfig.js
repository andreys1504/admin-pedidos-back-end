const opcoesConexaoBancoDados = require('./src/0-core/infra/dados/opcoes-conexao-banco-dados');
const { AmbientesAplicacao } = require('./src/0-core/configuracoes-aplicacoes/ambientes-aplicacao.app');

const ambiente = process.env.CURRENT_ENVIRONMENT || AmbientesAplicacao.DESENVOLVIMENTO_LOCAL;
if (ambiente === AmbientesAplicacao.DESENVOLVIMENTO_LOCAL) {
    const dotenv = require('dotenv');
    dotenv.config();
}

export default opcoesConexaoBancoDados(process.env);
