import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Pedido } from "./pedido";
import { Produto } from './produto';
import { SituacaoInternaItemPedido } from "./situacao-interna-item-pedido";
import { SituacaoExternaItemPedido } from "./situacao-externa-item-pedido";
import { IdsSituacoesExternasItemPedidoConstante } from "../constantes/situacao-externa-item-pedido/ids-situacoes-externas-item-pedido.constante";
import { IdsSituacoesInternasItemPedidoConstante } from "../constantes/situacao-interna-item-pedido/ids-situacoes-internas-item-pedido.constante";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.PEDIDO_ITEM)
export class PedidoItem extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: TabelasBancoDados.PEDIDO + "Id", type: 'integer' })
    pedidoId: number;

    @ManyToOne(type => Pedido, pedido => pedido.itensPedido, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: TabelasBancoDados.PEDIDO + "Id" })
    pedido: Pedido;

    @Column({ name: TabelasBancoDados.PRODUTO + "Id", type: 'integer' })
    produtoId: number;

    @ManyToOne(type => Produto, produto => produto.itensPedido)
    @JoinColumn({ name: TabelasBancoDados.PRODUTO + "Id" })
    produto: Produto;

    @Column({ name: "quantidade", type: 'integer' })
    quantidade: number;

    @Column({ name: TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO + "Id", type: 'integer' })
    situacaoInternaItemPedidoId: number;

    @ManyToOne(type => SituacaoInternaItemPedido, situacaoInternaItemPedido => situacaoInternaItemPedido.itensPedido)
    @JoinColumn({ name: TabelasBancoDados.SITUACAO_INTERNA_ITEM_PEDIDO + "Id" })
    situacaoInternaItemPedido: SituacaoInternaItemPedido;

    @Column({ name: "valorUnitario", type: 'numeric' })
    valorUnitario: string;

    @Column({ name: TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO + "Id", type: 'integer' })
    situacaoExternaItemPedidoId: number;

    @ManyToOne(type => SituacaoExternaItemPedido, situacaoExternaItemPedido => situacaoExternaItemPedido.itensPedido)
    @JoinColumn({ name: TabelasBancoDados.SITUACAO_EXTERNA_ITEM_PEDIDO + "Id" })
    situacaoExternaItemPedido: SituacaoExternaItemPedido;

    @Column({ name: "valorTotal", type: 'numeric' })
    valorTotal: string;

    @Column({ name: "nomeFuncionarioResponsavel", length: 45, type: 'character varying' })
    nomeFuncionarioResponsavel: string | null;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
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

    novoPedidoItemOriundoLojaVirtual(dados: {
        id: number | null,
        idPedido: number | null,
        idProduto: number,
        quantidade: number,
        valorUnitario: string,
    }) {
        if (dados.id)
            this.id = dados.id;

        if (dados.idPedido)
            this.pedidoId = dados.idPedido;

        this.produtoId = dados.idProduto;
        this.quantidade = dados.quantidade;
        this.situacaoInternaItemPedidoId = IdsSituacoesInternasItemPedidoConstante.Recebido;
        this.valorUnitario = dados.valorUnitario;
        this.situacaoExternaItemPedidoId = IdsSituacoesExternasItemPedidoConstante.EmAndamento;
        this.valorTotal = this.calcularValorTotal({ valorUnitario: this.valorUnitario, quantidade: this.quantidade });
        this.dataAtualizacao = new Date();
        this.nomeFuncionarioResponsavel = null;
    }

    calcularValorTotal(dados: {
        valorUnitario: string;
        quantidade: number;
    }) {
        return (parseFloat(dados.valorUnitario) * dados.quantidade).toFixed(2);
    }
}