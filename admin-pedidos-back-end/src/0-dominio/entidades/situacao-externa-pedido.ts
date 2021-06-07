import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Pedido } from "./pedido";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.SITUACAO_EXTERNA_PEDIDO)
export class SituacaoExternaPedido extends Entidade {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Pedido, pedido => pedido.situacaoExternaPedido)
    pedidos: Pedido[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novaSituacaoExternaPedido(situacaoExternaPedido: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = situacaoExternaPedido.id;
        this.descricao = situacaoExternaPedido.descricao;
        this.ativo = situacaoExternaPedido.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}