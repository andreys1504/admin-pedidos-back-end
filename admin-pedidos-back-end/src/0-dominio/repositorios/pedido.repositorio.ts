import { Pedido } from '../entidades/pedido';
import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';
import { PedidoItem } from '../entidades/pedido-item';
import { TabelasBancoDados } from '../../0-core/infra/dados/tabelas-banco-dados.app';

export class PedidoRepositorio extends Repositorio<Pedido> {
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
                    "${TabelasBancoDados.PEDIDO}" "pedido"
                    JOIN "${TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO}" "situacaoExternaPedido"
                        ON "pedido"."situacaoExternaPedidoId" = "situacaoExternaPedido"."id"
                WHERE
                    "pedido"."clienteId" = $1
            `;
        const pedidos = await this.retornarDadosPorSql<Pedido>({ sql, parametros: [idCliente] });

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
                        "${TabelasBancoDados.PEDIDO_ITEM}" "pedidoItem"
                        JOIN "${TabelasBancoDados.PEDIDO}" "pedido" ON "pedidoItem"."pedidoId" = "pedido"."id"
                        JOIN "${TabelasBancoDados.PRODUTO}" "produto" ON "pedidoItem"."produtoId" = "produto"."id"
                        JOIN "${TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO}" "situacaoExternaItemPedido" 
                            ON "pedidoItem"."situacaoExternaItemPedidoId" = "situacaoExternaItemPedido"."id"
                    WHERE
                        "pedido"."clienteId" = $1
                `;

            const itensPedido = (await this.retornarDadosPorSql<PedidoItem>({
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