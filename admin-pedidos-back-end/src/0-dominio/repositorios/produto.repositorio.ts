import { Produto } from '../entidades/produto';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';
import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { parametroValidoSql } from '../../0-core/helpers';
import { ProdutoImagens } from '../entidades/produto-imagens';

export class ProdutoRepositorio extends Repositorio<Produto> {
    constructor() {
        super(Produto.name);
    }

    async produtosPorConteudoDescricao(opcoesBusca: {
        descricao: string,
        camposRetorno?: string[],
        retornarImagens?: boolean
    }) {
        if (!parametroValidoSql(opcoesBusca.descricao) || !opcoesBusca.descricao)
            return [] as Produto[];

        let like = `%${opcoesBusca.descricao}%`;
        if (opcoesBusca.descricao.length <= 3)
            like = `${opcoesBusca.descricao}%`;

        const aliasTabela = 'prod'
        const sql =
            `
                        SELECT
                            ${
                                (opcoesBusca.camposRetorno && opcoesBusca.camposRetorno.length > 0) ?
                                (this.configurarCamposSelect({
                                    camposRetorno: opcoesBusca.camposRetorno,
                                    aliasTabela
                                }))
                                : ' * '
                            }
                        FROM
                            "${TabelasBancoDados.PRODUTO}" "${aliasTabela}"
                        WHERE
                            "${aliasTabela}"."descricao" ILIKE '${like}'
                        ORDER BY
                            "${aliasTabela}"."descricao" ASC
            `;

        const produtos = await this.retornarDadosPorSql<Produto>({ sql });

        if(opcoesBusca.retornarImagens === true && produtos && produtos.length > 0) {
            produtos.map(async produto => {
                produto.imagens = (
                    await this.retornarDadosPorSql<ProdutoImagens>({
                        sql: 
                        `
                            SELECT
                                "produtoImagens"."nomeArquivo"
                            FROM
                                "${TabelasBancoDados.PRODUTO_IMAGENS}" "produtoImagens"
                            WHERE
                                "produtoImagens"."produtoId" = $1
                        `,
                        parametros: [produto.id]
                    })
                )
            });
        }

        return produtos;
    }

    async editar(entidades: { 
        produtoEdicao: Produto,
        imagensProduto: ProdutoImagens[]
    }) {
        await this.contextoBase.transaction(async transactionalEntityManager => {
            transactionalEntityManager.query(`
                DELETE FROM "${TabelasBancoDados.PRODUTO_IMAGENS}" WHERE "produtoId" = $1
            `, [entidades.produtoEdicao.id]);

            entidades.imagensProduto.forEach(async imagem => {
                await transactionalEntityManager.save(imagem);
            });

            await transactionalEntityManager.save(entidades.produtoEdicao);
        });
    }

    async imagensProduto(idProduto: number) {
        const sql = 
            `
                SELECT
                    "produtoImagens"."nomeArquivo" AS "nomeArquivo"
                    ,"produtoImagens"."imagemDestaque" AS "imagemDestaque"
                FROM
                    "${TabelasBancoDados.PRODUTO_IMAGENS}" "produtoImagens"
                WHERE
                    "produtoImagens"."produtoId" = $1
            `;

        return await this.retornarDadosPorSql<ProdutoImagens>({ sql, parametros: [idProduto] });
    }

    async imagensDestaqueProduto(idProduto: number) {
        const sql = 
            `
                SELECT
                    "produtoImagens"."nomeArquivo" AS "nomeArquivo"
                    ,"produtoImagens"."imagemDestaque" AS "imagemDestaque"
                FROM
                    "${TabelasBancoDados.PRODUTO_IMAGENS}" "produtoImagens"
                WHERE
                    "produtoImagens"."produtoId" = $1
                    AND "produtoImagens"."imagemDestaque" = true
            `;

        return await this.retornarDadosPorSql<ProdutoImagens>({ sql, parametros: [idProduto] });
    }

    async demaisImagensProduto(idProduto: number) {
        const sql = 
            `
                SELECT
                    "produtoImagens"."nomeArquivo" AS "nomeArquivo"
                    ,"produtoImagens"."imagemDestaque" AS "imagemDestaque"
                FROM
                    "${TabelasBancoDados.PRODUTO_IMAGENS}" "produtoImagens"
                WHERE
                    "produtoImagens"."produtoId" = $1
                    AND "produtoImagens"."imagemDestaque" = false
            `;

        return await this.retornarDadosPorSql<ProdutoImagens>({ sql, parametros: [idProduto] });
    }
}