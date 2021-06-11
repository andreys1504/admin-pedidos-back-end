import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { PedidoItem } from "./pedido-item";
import { Entity as EntityDomain } from "../../core/domain/entities/entity";

@Entity(DatabaseTables.SITUACAO_EXTERNA_ITEM_PEDIDO)
export class SituacaoExternaItemPedido extends EntityDomain {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => PedidoItem, pedidoItem => pedidoItem.situacaoExternaItemPedido)
    itensPedido: PedidoItem[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novaSituacaoExternaItemPedido(situacaoExternaItemPedido: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = situacaoExternaItemPedido.id;
        this.descricao = situacaoExternaItemPedido.descricao;
        this.ativo = situacaoExternaItemPedido.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}