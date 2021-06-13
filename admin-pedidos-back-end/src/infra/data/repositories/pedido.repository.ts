import { DatabaseTables } from "../../../core/infra/data/database-tables";
import { RepositoryBase } from "../repository";
import { Pedido, PedidoItem } from "../../../domain/entities";

export class PedidoRepository extends RepositoryBase<Pedido> {
    constructor() {
        super(Pedido.name);
    }

    async editar(entidades: { pedido: Pedido, pedidoItens: PedidoItem[] }) {
        await this.contextoBase.transaction(async transactionalEntityManager => {
            transactionalEntityManager.query(`
                DELETE FROM "pedidoItem" WHERE "pedidoId" = $1
            `, [entidades.pedido.id]);

            entidades.pedidoItens.forEach(async item => {
                await transactionalEntityManager.save(item);
            });

            await transactionalEntityManager.save(entidades.pedido);
        });

        return { pedido: entidades.pedido, pedidoItens: entidades.pedidoItens };
    }

    async meusPedidosLoja(idCliente: number) {
        const sql =
            `
                SELECT
                    "pedido"."id"
                    ,"pedido"."dataEmissaoPedido"
                    ,"pedido"."situacaoExternaPedidoId"
                    ,"situacaoExternaPedido"."descricao" AS "situacaoExternaPedido_descricao"
                    ,"pedido"."dataFinalizacaoPedido"
                    ,"pedido"."pedidoRealizadoLojaVirtual"
                    ,"pedido"."receberPedidoResidencia"
                FROM
                    "${DatabaseTables.PEDIDO}" "pedido"
                    JOIN "${DatabaseTables.SITUACAO_EXTERNA_PEDIDO}" "situacaoExternaPedido"
                        ON "pedido"."situacaoExternaPedidoId" = "situacaoExternaPedido"."id"
                WHERE
                    "pedido"."clienteId" = $1
            `;
        const pedidos = await this.retornarDadosPorSqlAsync<Pedido>({ sql, parametros: [idCliente] });

        if (pedidos && pedidos.length > 0) {
            const sqlItensPedido =
                `
                    SELECT
                        "pedidoItem"."id"
                        ,"pedidoItem"."pedidoId"
                        ,"pedidoItem"."produtoId"
                        ,"pedidoItem"."quantidade"
                        ,"pedidoItem"."valorTotal"
                        ,"pedidoItem"."valorUnitario"
                        ,"pedidoItem"."situacaoExternaItemPedidoId"
                        ,"produto"."descricao" AS "produto_descricao"
                        ,"situacaoExternaItemPedido"."descricao" AS "situacaoExternaItemPedido_descricao"
                    FROM
                        "${DatabaseTables.PEDIDO_ITEM}" "pedidoItem"
                        JOIN "${DatabaseTables.PEDIDO}" "pedido" ON "pedidoItem"."pedidoId" = "pedido"."id"
                        JOIN "${DatabaseTables.PRODUTO}" "produto" ON "pedidoItem"."produtoId" = "produto"."id"
                        JOIN "${DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO}" "situacaoExternaItemPedido" 
                            ON "pedidoItem"."situacaoExternaItemPedidoId" = "situacaoExternaItemPedido"."id"
                    WHERE
                        "pedido"."clienteId" = $1
                `;

            const itensPedido = (await this.retornarDadosPorSqlAsync<PedidoItem>({
                sql: sqlItensPedido,
                parametros: [idCliente]
            }));

            pedidos.forEach(pedido => {
                pedido.itensPedido = itensPedido.filter(x => x.pedidoId === pedido.id);
            });
        }

        return pedidos;
    }
}