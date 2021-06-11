
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { Entidade } from "../../core/domain/entities/entity";
import { TransportadoraFrete } from "./transportadora-frete";
import { Pedido } from "./pedido";
import { IdsTransportadoraFreteConstante } from "../constants/transportadora-frete/ids-transportadora-frete.constante";

@Entity(DatabaseTables.PEDIDO_DADOS_ENTREGA)
export class PedidoDadosEntrega extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: DatabaseTables.PEDIDO + "Id", type: 'integer' })
    pedidoId: number;

    @OneToOne(type => Pedido)
    @JoinColumn({ name: DatabaseTables.PEDIDO + "Id" })
    pedido: Pedido;

    @Column({ name: "nomeRecebedor", length: 45, type: 'character varying' })
    nomeRecebedor: string;

    @Column({ name: "logradouro", length: 150, type: 'character varying' })
    logradouro: string;

    @Column({ name: "complemento", length: 150, type: 'character varying' })
    complemento: string | null;

    @Column({ name: "cep", length: 8, type: 'character varying' })
    cep: string;

    @Column({ name: "nomeCidade", length: 150, type: 'character varying' })
    nomeCidade: string;

    @Column({ name: "siglaUf", length: 2, type: 'character varying' })
    siglaUf: string;

    @Column({ name: "telefone", length: 16, type: 'character varying' })
    telefone: string;

    @Column({ name: "email", length: 100, type: 'character varying' })
    email: string;

    @Column({ name: "descricaoFrete", length: 150, type: 'character varying' })
    descricaoFrete: string;

    @Column({ name: "valorFrete", type: 'numeric' })
    valorFrete: string;

    @Column({ name: DatabaseTables.TRANSPORTADORA_FRETE + "Id", type: 'integer' })
    transportadoraFreteId: number;

    @ManyToOne(type => TransportadoraFrete, transportadora => transportadora.pedidosDadosEntrega, { onUpdate: 'CASCADE' })
    @JoinColumn({ name: DatabaseTables.TRANSPORTADORA_FRETE + "Id" })
    transportadoraFrete: TransportadoraFrete;

    novoDadosEntrega(dadosEntrega: {
        idPedido: number,
        nomeRecebedor: string,
        logradouro: string,
        complemento: string | null,
        cep: string,
        nomeCidade: string,
        siglaUf: string,
        telefone: string,
        email: string,
        descricaoFrete: string,
        valorFrete: string
    }) {
        if (dadosEntrega.idPedido)
            this.pedidoId = dadosEntrega.idPedido;

        this.nomeRecebedor = dadosEntrega.nomeRecebedor;
        this.logradouro = dadosEntrega.logradouro;
        this.complemento = dadosEntrega.complemento;
        this.cep = dadosEntrega.cep;
        this.nomeCidade = dadosEntrega.nomeCidade;
        this.siglaUf = dadosEntrega.siglaUf;
        this.telefone = dadosEntrega.telefone;
        this.email = dadosEntrega.email;
        this.descricaoFrete = dadosEntrega.descricaoFrete;
        this.valorFrete = dadosEntrega.valorFrete;
        this.transportadoraFreteId = IdsTransportadoraFreteConstante.CORREIOS;
    }
}
