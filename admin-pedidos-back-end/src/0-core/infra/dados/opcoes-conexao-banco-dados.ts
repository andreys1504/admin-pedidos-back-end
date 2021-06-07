import { AmbientesAplicacao } from "../../configuracoes-aplicacoes/ambientes-aplicacao.app";

export const opcoesConexaoBancoDados = (env: any) => {
    let configuracoes: any = {
        type: 'postgres',
        host: env.TYPEORM_HOST || '',
        port: env.TYPEORM_PORT || 5432,
        username: env.TYPEORM_USERNAME || '',
        password: env.TYPEORM_PASSWORD || '',
        database: env.TYPEORM_DATABASE || '',
        synchronize: env.TYPEORM_SYNCHRONIZE === 'true',
        logging: env.TYPEORM_LOGGING === 'false',
        migrationsTableName: env.TYPEORM_MIGRATIONS_TABLE_NAME || '',
        entities: [
            env.TYPEORM_ENTITIES || ''
        ],
        migrations: [
            env.TYPEORM_MIGRATIONS || ''
        ],
        cli: {
            migrationsDir: env.TYPEORM_MIGRATIONS_DIR || ''
        }
    }

    if (env.CURRENT_ENVIRONMENT !== AmbientesAplicacao.DESENVOLVIMENTO_LOCAL) {
        configuracoes.extra = {
            ssl: { "rejectUnauthorized": false }
        }
    }

    return configuracoes;
}

