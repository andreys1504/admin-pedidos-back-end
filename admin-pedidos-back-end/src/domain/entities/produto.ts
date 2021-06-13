import { Entity, Column, OneToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { DatabaseTables } from '../../core/infra/data/database-tables';
import { PedidoItem } from './pedido-item';
import { TipoProduto } from './tipo-produto';
import { Entity as EntityDomain } from '../../core/domain/entities/entity';
import { ProdutoImagens } from './produto-imagens';

@Entity(DatabaseTables.PRODUTO)
export class Produto extends EntityDomain {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'descricao', length: 150, type: 'character varying' })
    descricao: string;

    @Column({ name: 'ativo', type: 'boolean' })
    ativo: boolean;

    @Column({ name: 'valorUnitario', type: 'numeric' })
    valorUnitario: string;

    @Column({ name: DatabaseTables.TIPO_PRODUTO + 'Id', type: 'integer' })
    tipoProdutoId: number;

    @ManyToOne(type => TipoProduto, tipoProduto => tipoProduto.produtos)
    @JoinColumn({ name: DatabaseTables.TIPO_PRODUTO + 'Id' })
    tipoProduto: TipoProduto;

    @OneToMany(type => PedidoItem, pedidoItem => pedidoItem.produto)
    itensPedido: PedidoItem[];

    @OneToMany(type => ProdutoImagens, produtoImagens => produtoImagens.produto, { cascade: true })
    imagens: ProdutoImagens[];

    @Column({ name: 'detalhesProduto', type: 'text' })
    detalhesProduto: string | null;

    @Column({ name: 'destaqueTelaPrincipal', type: 'boolean' })
    destaqueTelaPrincipal: boolean;

    @Column({ name: 'dataCriacao', type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: 'dataAtualizacao', type: 'timestamp' })
    dataAtualizacao: Date;

    novoProduto(produto: {
        descricao: string;
        valorUnitario: string;
        nomesImagensDestaque: string[];
        idTipoProduto: number;
        nomesDemaisImagens: string[];
        detalhesProduto: string | null;
        destaqueTelaPrincipal: boolean;
    }) {
        this.descricao = produto.descricao;
        this.ativo = true;
        this.valorUnitario = produto.valorUnitario;
        this.tipoProdutoId = produto.idTipoProduto;
        
        this.imagens = new Array<ProdutoImagens>();

        if (produto.nomesImagensDestaque && produto.nomesImagensDestaque.length > 0) {
            this.imagens = produto.nomesImagensDestaque.map(imagem => {
                const novaImagem = new ProdutoImagens();
                novaImagem.novaImagem({
                    nomeArquivo: imagem,
                    idProduto: this.id,
                    imagemDestaque: true
                });
                return novaImagem;
            });
        }

        if (produto.nomesDemaisImagens && produto.nomesDemaisImagens.length > 0) {
            produto.nomesDemaisImagens.map(imagem => {
                const novaImagem = new ProdutoImagens();
                novaImagem.novaImagem({
                    nomeArquivo: imagem,
                    idProduto: this.id,
                    imagemDestaque: false
                });
                this.imagens.push(novaImagem);
            });
        }

        this.detalhesProduto = produto.detalhesProduto;
        this.destaqueTelaPrincipal = produto.destaqueTelaPrincipal;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    editar(produto: {
        descricao: string;
        valorUnitario: string;
        idTipoProduto: number;
        detalhesProduto: string | null;
        destaqueTelaPrincipal: boolean;
    }) {
        this.descricao = produto.descricao;
        this.valorUnitario = produto.valorUnitario;
        this.tipoProdutoId = produto.idTipoProduto;
        this.detalhesProduto = produto.detalhesProduto;
        this.destaqueTelaPrincipal = produto.destaqueTelaPrincipal;
    }
}