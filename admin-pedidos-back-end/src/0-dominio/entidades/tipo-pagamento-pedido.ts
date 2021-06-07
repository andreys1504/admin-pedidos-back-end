import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Pedido } from "./pedido";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.TIPO_PAGAMENTO_PEDIDO)
export class TipoPagamentoPedido extends Entidade {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Pedido, pedido => pedido.tipoPagamentoPedido)
    pedidos: Pedido[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoTipoPagamento(tipoPagamento: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = tipoPagamento.id;
        this.descricao = tipoPagamento.descricao;
        this.ativo = tipoPagamento.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}