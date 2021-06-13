import { Repository, FindManyOptions, FindOneOptions, getManager } from "typeorm";

export abstract class RepositoryBase<TEntidade> {
    private readonly repositorio: Repository<TEntidade>;

    constructor(nomeEntidade: string) {
        this.repositorio = getManager().getRepository(nomeEntidade);
    }

    protected get contextoBase() {
        return getManager();
    }

    public async entidadeAsync(opcoesBusca: {
        camposRetorno: (keyof TEntidade)[],
        ordernacao?: { [P in keyof TEntidade]?: "ASC" | "DESC" | 1 | -1; },
        filtro?: object,
        entidadesRelacionadas?: string[]
    }) {
        let opcoesBuscaDadosOrm: FindOneOptions = {};

        if (opcoesBusca.filtro)
            opcoesBuscaDadosOrm.where = opcoesBusca.filtro;

        if (opcoesBusca.camposRetorno && opcoesBusca.camposRetorno.length > 0)
            opcoesBuscaDadosOrm.select = opcoesBusca.camposRetorno;

        if (opcoesBusca.entidadesRelacionadas && opcoesBusca.entidadesRelacionadas.length > 0)
            opcoesBuscaDadosOrm.relations = opcoesBusca.entidadesRelacionadas;

        if (opcoesBusca.ordernacao)
            opcoesBuscaDadosOrm.order = opcoesBusca.ordernacao;

        const entidade = await this.repositorio.findOne(opcoesBuscaDadosOrm);
        return entidade;
    }

    public async entidadesAsync(opcoesBusca: {
        camposRetorno: (keyof TEntidade)[],
        ordernacao?: { [P in keyof TEntidade]?: "ASC" | "DESC" | 1 | -1; },
        filtro?: object,
        entidadesRelacionadas?: string[]
    }) {

        let opcoesBuscaDadosOrm: FindManyOptions = {};

        if (opcoesBusca.filtro)
            opcoesBuscaDadosOrm.where = opcoesBusca.filtro;

        if (opcoesBusca.camposRetorno && opcoesBusca.camposRetorno.length > 0)
            opcoesBuscaDadosOrm.select = opcoesBusca.camposRetorno;

        if (opcoesBusca.entidadesRelacionadas && opcoesBusca.entidadesRelacionadas.length > 0)
            opcoesBuscaDadosOrm.relations = opcoesBusca.entidadesRelacionadas;

        if (opcoesBusca.ordernacao)
            opcoesBuscaDadosOrm.order = opcoesBusca.ordernacao;

        const entidade = await this.repositorio.find(opcoesBuscaDadosOrm);
        return entidade;
    }

    public async salvarAsync(entidade: TEntidade) {
        await this.repositorio.save(entidade);
    }

    protected async retornarDadosPorSqlAsync<TRetorno>(opcoesBusca: { 
        sql: string,
        parametros?: any[]
    }) {
        return await getManager().query(opcoesBusca.sql, opcoesBusca.parametros) as TRetorno[];
    }

    protected configurarCamposSelect(opcoesRetorno: {
        camposRetorno: string[],
        aliasTabela: string
    }) {
        let contador = 0;
        const quantidadeCampos = opcoesRetorno.camposRetorno.length;
        let camposSelect = ' ';
        opcoesRetorno.camposRetorno.forEach(campo => {
            contador++;
            camposSelect += `${opcoesRetorno.aliasTabela}."${campo}"`;

            if (quantidadeCampos != contador)
                camposSelect += ',';
        });

        return camposSelect;
    }
}
