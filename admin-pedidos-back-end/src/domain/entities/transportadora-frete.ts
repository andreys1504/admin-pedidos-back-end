import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { Entidade } from "../../core/domain/entities/entity";
import { PedidoDadosEntrega } from "./pedido-dados-entrega";

@Entity(DatabaseTables.TRANSPORTADORA_FRETE)
export class TransportadoraFrete extends Entidade {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 75, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => PedidoDadosEntrega, pedidoDadosEntrega => pedidoDadosEntrega.transportadoraFrete)
    pedidosDadosEntrega: PedidoDadosEntrega[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novaTransportadora(transportadora: {
        id: number,
        descricao: string,
        ativo: boolean,
    }) {
        this.id = transportadora.id;
        this.descricao = transportadora.descricao;
        this.ativo = transportadora.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}