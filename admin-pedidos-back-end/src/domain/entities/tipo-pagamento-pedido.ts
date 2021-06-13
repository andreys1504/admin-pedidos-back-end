import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { Pedido } from './pedido';
import { Entity as EntityDomain } from '../../core/domain/entities/entity';

@Entity(DatabaseTables.TIPO_PAGAMENTO_PEDIDO)
export class TipoPagamentoPedido extends EntityDomain {
    @PrimaryColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'descricao', length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: 'ativo', type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => Pedido, pedido => pedido.tipoPagamentoPedido)
    pedidos: Pedido[];

    @Column({ name: 'dataCriacao', type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: 'dataAtualizacao', type: 'timestamp' })
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