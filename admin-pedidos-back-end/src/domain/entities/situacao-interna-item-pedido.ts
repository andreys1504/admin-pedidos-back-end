import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { PedidoItem } from './pedido-item';

@Entity(DatabaseTables.SITUACAO_INTERNA_ITEM_PEDIDO)
export class SituacaoInternaItemPedido {
    @PrimaryColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'descricao', length: 45, type: 'character varying' })
    descricao: string;

    @Column({ name: 'ativo', type: 'boolean' })
    ativo: boolean;

    @OneToMany(type => PedidoItem, pedidoItem => pedidoItem.situacaoInternaItemPedido)
    itensPedido: PedidoItem[];

    @Column({ name: 'dataCriacao', type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: 'dataAtualizacao', type: 'timestamp' })
    dataAtualizacao: Date;

    novaSituacaoInternaItemPedido(situacaoInternaItemPedido: {
        id: number,
        descricao: string,
        ativo: boolean,

    }) {
        this.id = situacaoInternaItemPedido.id;
        this.descricao = situacaoInternaItemPedido.descricao;
        this.ativo = situacaoInternaItemPedido.ativo;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }
}