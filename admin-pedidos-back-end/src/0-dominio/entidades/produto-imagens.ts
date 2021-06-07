import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Entidade } from "../../0-core/dominio/entidades/entidade";
import { Produto } from "./produto";

@Entity(TabelasBancoDados.PRODUTO_IMAGENS)
export class ProdutoImagens extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "nomeArquivo", length: 500, type: 'character varying' })
    nomeArquivo: string;

    @Column({ name: TabelasBancoDados.PRODUTO + "Id", type: 'integer' })
    produtoId: number;

    @ManyToOne(type => Produto, produto => produto.imagens)
    @JoinColumn({ name: TabelasBancoDados.PRODUTO + "Id" })
    produto: Produto;

    @Column({ name: "imagemDestaque", type: 'boolean' })
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