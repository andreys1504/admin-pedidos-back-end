import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.PERMISSAO_ACESSO)
export class PermissaoAcesso extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "descricao", length: 75, type: 'character varying' })
    descricao: string;

    @Column({ name: "chave", length: 60, type: 'character varying' })
    chave: string;

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;
} 
