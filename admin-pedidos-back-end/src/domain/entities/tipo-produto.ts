import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { Produto } from './produto';
import { Entity as EntityDomain } from '../../core/domain/entities/entity';

@Entity(DatabaseTables.TIPO_PRODUTO)
export class TipoProduto extends EntityDomain {
    @PrimaryColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'descricao', length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: 'ativo', type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Produto, pedido => pedido.tipoProduto)
    produtos: Produto[];

    @Column({ name: 'dataCriacao', type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: 'dataAtualizacao', type: 'timestamp' })
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