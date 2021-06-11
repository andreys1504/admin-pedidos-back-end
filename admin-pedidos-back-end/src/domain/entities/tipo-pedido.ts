import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { Pedido } from "./pedido";
import { Entidade } from "../../core/domain/entities/entity";

@Entity(DatabaseTables.TIPO_PEDIDO)
export class TipoPedido extends Entidade {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Pedido, pedido => pedido.tipoPedido)
    pedidos: Pedido[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoTipoPedido(tipoPedido: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = tipoPedido.id;
        this.descricao = tipoPedido.descricao;
        this.ativo = tipoPedido.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}