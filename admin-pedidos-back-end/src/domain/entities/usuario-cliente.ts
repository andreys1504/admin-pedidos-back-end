import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { Cliente } from "./cliente";
import { Entidade } from "../../core/domain/entities/entity";

@Entity(DatabaseTables.USUARIO_CLIENTE)
export class UsuarioCliente extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "nomeUsuario", length: 20, type: 'character varying' })
    nomeUsuario: string;

    @Column({ name: "senha", length: 20, type: 'character varying' })
    senha: string;

    @Column({ name: "nome", length: 45, type: 'character varying' })
    nome: string;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @Column({ name: DatabaseTables.CLIENTE + 'Id', type: 'integer' })
    clienteId: number;

    @OneToOne(type => Cliente, cliente => cliente.usuarioCliente)
    @JoinColumn({ name: DatabaseTables.CLIENTE + "Id" })
    cliente: Cliente;

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoUsuario(novoUsuario: {
        nomeUsuario: string,
        senha: string,
        nome: string
    }) {
        this.nomeUsuario = novoUsuario.nomeUsuario;
        this.senha = novoUsuario.senha;
        this.nome = novoUsuario.nome;
        this.ativo = true;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    novoUsuarioPorLojaVirtual(novoUsuario: {
        nomeUsuario: string,
        senha: string,
        nome: string,
        idCliente: number,
    }) {
        this.nomeUsuario = novoUsuario.nomeUsuario;
        this.senha = novoUsuario.senha;
        this.nome = novoUsuario.nome;
        this.ativo = true;
        this.clienteId = novoUsuario.idCliente,
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    static nomeUsuarioCaracteresValidos(valor: string) {
        if (!valor) return;

        let nomeUsuarioSemCaracteresInvalidos = valor;
        const qtdCaracteres = valor.length;
        for (let i = 0; i < qtdCaracteres; i++) {
            //nomeUsuarioSemCaracteresInvalidos = nomeUsuarioSemCaracteresInvalidos.replace(/\s+/, ''); //espaços
            nomeUsuarioSemCaracteresInvalidos = nomeUsuarioSemCaracteresInvalidos.replace(/\d/, ''); //numeros
            nomeUsuarioSemCaracteresInvalidos = nomeUsuarioSemCaracteresInvalidos.replace(/[a-z]/, ''); //minusculas
            nomeUsuarioSemCaracteresInvalidos = nomeUsuarioSemCaracteresInvalidos.replace(/[A-Z]/, ''); //maiusculas
        }

        if (nomeUsuarioSemCaracteresInvalidos !== '')
            return false;

        return true;
    }
}