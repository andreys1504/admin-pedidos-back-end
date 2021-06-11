import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { PermissaoAcesso } from './permissao-acesso';
import { Pedido } from "./pedido";
import { Entidade } from "../../core/domain/entities/entity";
import { autenticacaoUsuarioServico } from "../../apis/security/autenticacao-usuario.servico";

@Entity(DatabaseTables.USUARIO_ADMIN)
export class UsuarioAdmin extends Entidade {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "nomeUsuario", length: 20, type: 'character varying' })
    nomeUsuario: string;

    @Column({ name: "senha", length: 20, type: 'character varying' })
    senha: string;

    @Column({ name: "nome", length: 45, type: 'character varying' })
    nome: string;

    @Column({ name: "necessarioAlteracaoSenha", type: 'boolean' })
    necessarioAlteracaoSenha: boolean;

    @Column({ name: "ativo", type: 'boolean' })
    ativo: boolean;

    @ManyToMany(type => PermissaoAcesso)
    @JoinTable({
        name: DatabaseTables.USUARIO_PERMISSOES,
        joinColumn: { name: DatabaseTables.USUARIO_ADMIN + "Id", referencedColumnName: "id" },
        inverseJoinColumn: { name: DatabaseTables.PERMISSAO_ACESSO + "Id", referencedColumnName: "id" }
    })
    permissoesAcesso: PermissaoAcesso[];

    @OneToMany(type => Pedido, pedido => pedido.usuarioRegistroPedido)
    pedidos: Pedido[];

    @OneToMany(type => Pedido, pedido => pedido.usuarioResponsavelPedido)
    pedidosResponsabilidade: Pedido[];

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoUsuario(novoUsuario: {
        nomeUsuario: string,
        senha: string,
        nome: string,
        permissoesAcesso: PermissaoAcesso[]
    }) {
        this.nomeUsuario = novoUsuario.nomeUsuario;
        this.senha = novoUsuario.senha;
        this.nome = novoUsuario.nome;
        this.necessarioAlteracaoSenha = true;
        this.ativo = true;
        this.permissoesAcesso = novoUsuario.permissoesAcesso;
        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    desativar() {
        this.ativo = false;
    }

    ativar() {
        this.ativo = true;  
    }

    editar(dados: {
        nomeUsuario: string,
        senhaEditada: boolean,
        senha: string,
        nome: string,
        permissoesAcesso: PermissaoAcesso[]
    }) {
        this.nomeUsuario = dados.nomeUsuario;
        if (dados.senhaEditada)
            this.senha = autenticacaoUsuarioServico.gerarSenhaCodificada(dados.senha);
        this.nome = dados.nome;
        this.necessarioAlteracaoSenha = true;
        this.permissoesAcesso = dados.permissoesAcesso;
    }

    alterarSenha(novaSenha: string) {
        this.senha = autenticacaoUsuarioServico.gerarSenhaCodificada(novaSenha)
        this.necessarioAlteracaoSenha = false;
    }

    static gerarSenha(senha: string) {
        return autenticacaoUsuarioServico.gerarSenhaCodificada(senha)
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