import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { Cliente } from "./cliente";
import { Entity as EntityDomain } from "../../core/domain/entities/entity";

@Entity(DatabaseTables.TIPO_CLIENTE)
export class TipoCliente extends EntityDomain {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Cliente, cliente => cliente.tipoCliente)
    clientes: Cliente[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoTipoCliente(tipoCliente: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = tipoCliente.id;
        this.descricao = tipoCliente.descricao;
        this.ativo = tipoCliente.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}