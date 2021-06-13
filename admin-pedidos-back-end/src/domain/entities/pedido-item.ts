import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { Pedido } from './pedido';
import { Produto } from './produto';
import { SituacaoInternaItemPedido } from './situacao-interna-item-pedido';
import { SituacaoExternaItemPedido } from './situacao-externa-item-pedido';
import { Entity as EntityDomain } from '../../core/domain/entities/entity';
import { IdsSituacoesInternasItemPedidoConstante } from '../constants/situacao-interna-item-pedido/ids-situacoes-internas-item-pedido.constante';
import { IdsSituacoesExternasItemPedidoConstante } from '../constants/situacao-externa-item-pedido/ids-situacoes-externas-item-pedido.constante';

@Entity(DatabaseTables.PEDIDO_ITEM)
export class PedidoItem extends EntityDomain {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: DatabaseTables.PEDIDO + 'Id', type: 'integer' })
    pedidoId: number;

    @ManyToOne(type => Pedido, pedido => pedido.itensPedido, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: DatabaseTables.PEDIDO + 'Id' })
    pedido: Pedido;

    @Column({ name: DatabaseTables.PRODUTO + 'Id', type: 'integer' })
    produtoId: number;

    @ManyToOne(type => Produto, produto => produto.itensPedido)
    @JoinColumn({ name: DatabaseTables.PRODUTO + 'Id' })
    produto: Produto;

    @Column({ name: 'quantidade', type: 'integer' })
    quantidade: number;

    @Column({ name: DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO + 'Id', type: 'integer' })
    situacaoInternaItemPedidoId: number;

    @ManyToOne(type => SituacaoInternaItemPedido, situacaoInternaItemPedido => situacaoInternaItemPedido.itensPedido)
    @JoinColumn({ name: DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO + 'Id' })
    situacaoInternaItemPedido: SituacaoInternaItemPedido;

    @Column({ name: 'valorUnitario', type: 'numeric' })
    valorUnitario: string;

    @Column({ name: DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO + 'Id', type: 'integer' })
    situacaoExternaItemPedidoId: number;

    @ManyToOne(type => SituacaoExternaItemPedido, situacaoExternaItemPedido => situacaoExternaItemPedido.itensPedido)
    @JoinColumn({ name: DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO + 'Id' })
    situacaoExternaItemPedido: SituacaoExternaItemPedido;

    @Column({ name: 'valorTotal', type: 'numeric' })
    valorTotal: string;

    @Column({ name: 'nomeFuncionarioResponsavel', length: 45, type: 'character varying' })
    nomeFuncionarioResponsavel: string | null;

    @Column({ name: 'dataAtualizacao', type: 'timestamp' })
    dataAtualizacao: Date;

    novoPedidoItem(dados: {
        id: number | null,
        idPedido: number | null,
        idProduto: number,
        quantidade: number,
        idSituacaoInternaItemPedido: number,
        idSituacaoExternaItemPedido: number,
        valorUnitario: string,
        nomeFuncionarioResponsavel: string | null
    }) {
        if (dados.id)
            this.id = dados.id;

        if (dados.idPedido)
            this.pedidoId = dados.idPedido;

        this.produtoId = dados.idProduto;
        this.quantidade = dados.quantidade;
        this.situacaoInternaItemPedidoId = dados.idSituacaoInternaItemPedido;
        this.valorUnitario = dados.valorUnitario;
        this.situacaoExternaItemPedidoId = dados.idSituacaoExternaItemPedido;
        this.valorTotal = this.calcularValorTotal({ valorUnitario: this.valorUnitario, quantidade: this.quantidade });
        this.dataAtualizacao = new Date();
        this.nomeFuncionarioResponsavel = dados.nomeFuncionarioResponsavel;
    }

    calcularValorTotal(dados: {
        valorUnitario: string;
        quantidade: number;
    }) {
        return (parseFloat(dados.valorUnitario) * dados.quantidade).toFixed(2);
    }
}
