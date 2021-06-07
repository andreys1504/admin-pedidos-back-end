import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Cliente } from "./cliente";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.TIPO_CLIENTE)
export class TipoCliente extends Entidade {
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