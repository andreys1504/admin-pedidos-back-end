import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from "typeorm";

import { TipoCliente } from "./tipo-cliente";
import { Pedido } from "./pedido";
import { UsuarioCliente } from "./usuario-cliente";
import { TabelasBancoDados } from "../../0-core/infra/dados/tabelas-banco-dados.app";
import { Entidade } from "../../0-core/dominio/entidades/entidade";

@Entity(TabelasBancoDados.CLIENTE)
export class Cliente extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "nome", length: 45, type: 'character varying' })
    nome: string;

    @Column({ name: "nomeGuerra", length: 45, type: 'character varying' })
    nomeGuerra: string | null;

    @Column({ name: TabelasBancoDados.TIPO_CLIENTE + "Id", type: 'integer' })
    tipoClienteId: number;

    @ManyToOne(type => TipoCliente, tipoCliente => tipoCliente.clientes)
    @JoinColumn({ name: TabelasBancoDados.TIPO_CLIENTE + "Id" })
    tipoCliente: TipoCliente;

    @Column({ name: "cpfCnpj", length: 14, type: 'character varying' })
    cpfCnpj: string;

    @Column({ name: "logradouro", length: 150, type: 'character varying' })
    logradouro: string | null;

    @Column({ name: "cep", length: 8, type: 'character varying' })
    cep: string | null;

    @Column({ name: "nomeCidade", length: 150, type: 'character varying' })
    nomeCidade: string | null;

    @Column({ name: "siglaUf", length: 2, type: 'character varying' })
    siglaUf: string | null;

    @Column({ name: "telefone", length: 16, type: 'character varying' })
    telefone: string | null;

    @Column({ name: "email", length: 100, type: 'character varying' })
    email: string | null;

    @Column({ name: "tipoSanguineo", length: 10, type: 'character varying' })
    tipoSanguineo: string | null;

    @Column({ name: "medidasCliente", type: 'text' })
    medidasCliente: string | null;

    @OneToMany(type => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];

    @OneToOne(type => UsuarioCliente, usuarioCliente => usuarioCliente.cliente)
    usuarioCliente: UsuarioCliente;

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoCliente(cliente: {
        nome: string,
        nomeGuerra: string,
        idTipoCliente: number,
        cpfCnpj: string,
        logradouro: string,
        cep: string,
        nomeCidade: string,
        siglaUf: string,
        telefone: string,
        email: string,
        tipoSanguineo: string,
        medidasCliente: string
    }) {
        this.nome = cliente.nome;
        this.nomeGuerra = cliente.nomeGuerra;
        this.tipoClienteId = cliente.idTipoCliente;
        this.cpfCnpj = cliente.cpfCnpj;
        this.logradouro = cliente.logradouro;
        this.cep = cliente.cep;
        this.nomeCidade = cliente.nomeCidade;
        this.siglaUf = cliente.siglaUf;
        this.telefone = cliente.telefone;
        this.email = cliente.email;
        this.tipoSanguineo = cliente.tipoSanguineo;
        this.medidasCliente = cliente.medidasCliente;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    novoClientePorLojaVirtual(cliente: {
        idTipoCliente: number,
        cpfCnpj: string,
        nome: string,
        usuarioCliente: {
            nomeUsuario: string,
            senha: string
        }
    }) {
        this.nome = cliente.nome;
        this.nomeGuerra = null;
        this.tipoClienteId = cliente.idTipoCliente;
        this.cpfCnpj = cliente.cpfCnpj;
        this.logradouro = null;
        this.cep = null;
        this.nomeCidade = null;
        this.siglaUf = null;
        this.telefone = null;
        this.email = null;
        this.tipoSanguineo = null;
        this.medidasCliente = null;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();

        const usuarioCliente = new UsuarioCliente();
        usuarioCliente.novoUsuarioPorLojaVirtual({
            nome: cliente.nome,
            nomeUsuario: cliente.usuarioCliente.nomeUsuario,
            senha: cliente.usuarioCliente.senha,
            idCliente: this.id
        });
        this.usuarioCliente = usuarioCliente;
    }

    vincularUsuarioCliente(dadosUsuarioCliente: {
        nomeUsuario: string;
        senha: string;
    }) {
        const usuarioCliente = new UsuarioCliente();
        usuarioCliente.novoUsuarioPorLojaVirtual({
            nome: this.nome,
            nomeUsuario: dadosUsuarioCliente.nomeUsuario,
            senha: dadosUsuarioCliente.senha,
            idCliente: this.id
        });
        this.usuarioCliente = usuarioCliente;
    }

    static nomeClienteValido(valor: string) {
        if (!valor || valor.length < 2 || valor.length > 45)
            return false;

        return true;
    }

    editar(dados: {
        nome: string; 
        nomeGuerra: string; 
        idTipoCliente: number;
        logradouro: string; 
        cep: string; 
        nomeCidade: string; 
        siglaUf: string;
        telefone: string;
        email: string;
        tipoSanguineo: string;
        medidasCliente: string;
    }) {
        this.cep = dados.cep;
        this.email = dados.email;
        this.logradouro = dados.logradouro;
        this.nome = dados.nome;
        this.nomeCidade = dados.nomeCidade;
        this.nomeGuerra = dados.nomeGuerra;
        this.siglaUf = dados.siglaUf;
        this.telefone = dados.telefone;
        this.tipoClienteId = dados.idTipoCliente;
        this.tipoSanguineo = dados.tipoSanguineo;
        this.medidasCliente = dados.medidasCliente;
    }
}