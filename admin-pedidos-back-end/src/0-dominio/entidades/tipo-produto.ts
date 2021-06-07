import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Produto } from "./produto";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.TIPO_PRODUTO)
export class TipoProduto extends Entidade {
    @PrimaryColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Produto, pedido => pedido.tipoProduto)
    produtos: Produto[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoProduto(tipoPedido: {
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