import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { Entity as EntityDomain } from '../../core/domain/entities/entity';
import { Produto } from './produto';

@Entity(DatabaseTables.PRODUTO_IMAGENS)
export class ProdutoImagens extends EntityDomain {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'nomeArquivo', length: 500, type: 'character varying' })
    nomeArquivo: string;

    @Column({ name: DatabaseTables.PRODUTO + 'Id', type: 'integer' })
    produtoId: number;

    @ManyToOne(type => Produto, produto => produto.imagens)
    @JoinColumn({ name: DatabaseTables.PRODUTO + 'Id' })
    produto: Produto;

    @Column({ name: 'imagemDestaque', type: 'boolean' })
    imagemDestaque: boolean;

    novaImagem(dados: {
        nomeArquivo: string;
        idProduto: number;
        imagemDestaque: boolean;
    }) {
        this.nomeArquivo = dados.nomeArquivo;
        
        if (dados.idProduto)
            this.produtoId = dados.idProduto;

        this.imagemDestaque = dados.imagemDestaque;
    }
}