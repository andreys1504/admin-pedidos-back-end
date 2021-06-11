import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { DatabaseTables } from "../../core/infra/data/database-tables";
import { UsuarioAdmin } from "./usuario-admin";
import { Cliente } from "./cliente";
import { SituacaoExternaPedido } from "./situacao-externa-pedido";
import { TipoPagamentoPedido } from "./tipo-pagamento-pedido";
import { PedidoItem } from "./pedido-item";
import { TipoPedido } from "./tipo-pedido";
import { dataAAAAMMDD, gerarGuid } from "../../core/helpers";
import { Entity as EntityDomain } from "../../core/domain/entities/entity";
import { PedidoDadosEntrega } from "./pedido-dados-entrega";
import { IdsUsuariosAdminConstante } from "../constants/usuario-admin/ids-usuarios-admin.constante";
import { IdsSituacoesExternasPedidoConstante } from "../constants/situacao-externa-pedido/ids-situacoes-externas-pedido.constante";
import { IdTiposPedidosConstante } from "../constants/tipo-pedido/ids-tipos-pedidos.constante";
import { IdsTiposPagamentoConstante } from "../constants/tipo-pagamento/ids-tipos-pagamento.constante";

@Entity(DatabaseTables.PEDIDO)
export class Pedido extends EntityDomain {
    @PrimaryGeneratedColumn({ name: "id", type: 'integer' })
    id: number;

    @Column({ name: "id2", type: 'character varying' })
    id2: string | null;

    @Column({ name: "dataEmissaoPedido", type: 'date' })
    dataEmissaoPedido: string;

    @Column({ name: 'usuarioRegistroPedidoId', type: 'integer' })
    usuarioRegistroPedidoId: number;

    @ManyToOne(type => UsuarioAdmin, usuario => usuario.pedidos)
    @JoinColumn({ name: 'usuarioRegistroPedidoId' })
    usuarioRegistroPedido: UsuarioAdmin;

    @Column({ name: DatabaseTables.SITUACAO_EXTERNA_PEDIDO + "Id", type: 'integer' })
    situacaoExternaPedidoId: number;

    @ManyToOne(type => SituacaoExternaPedido, situacaoExternaPedido => situacaoExternaPedido.pedidos)
    @JoinColumn({ name: DatabaseTables.SITUACAO_EXTERNA_PEDIDO + "Id" })
    situacaoExternaPedido: SituacaoExternaPedido;

    @Column({ name: DatabaseTables.TIPO_PAGAMENTO_PEDIDO + "Id", type: 'integer' })
    tipoPagamentoPedidoId: number | null;

    @ManyToOne(type => TipoPagamentoPedido, tipoPagamento => tipoPagamento.pedidos)
    @JoinColumn({ name: DatabaseTables.TIPO_PAGAMENTO_PEDIDO + "Id" })
    tipoPagamentoPedido: TipoPagamentoPedido;

    @Column({ name: DatabaseTables.CLIENTE + "Id", type: 'integer' })
    clienteId: number;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    @JoinColumn({ name: DatabaseTables.CLIENTE + "Id" })
    cliente: Cliente;

    @Column({ name: DatabaseTables.TIPO_PEDIDO + "Id", type: 'integer' })
    tipoPedidoId: number;

    @ManyToOne(type => TipoPedido, tipoPedido => tipoPedido.pedidos)
    @JoinColumn({ name: DatabaseTables.TIPO_PEDIDO + "Id" })
    tipoPedido: TipoPedido;

    @OneToMany(type => PedidoItem, pedidoItem => pedidoItem.pedido, { cascade: true })
    itensPedido: PedidoItem[];

    @Column({ name: "dataPrevisaoEntrega", type: 'date', nullable: true })
    dataPrevisaoEntrega: string | null;

    @Column({ name: "tamanhoItensPedido", type: 'text' })
    tamanhoItensPedido: string | null;

    @Column({ name: "dataFinalizacaoPedido", type: 'date', nullable: true })
    dataFinalizacaoPedido: string | null;

    @Column({ name: "usuarioResponsavelPedidoId", type: 'integer' })
    usuarioResponsavelPedidoId: number | null;

    @ManyToOne(type => UsuarioAdmin, usuario => usuario.pedidosResponsabilidade)
    @JoinColumn({ name: "usuarioResponsavelPedidoId" })
    usuarioResponsavelPedido: UsuarioAdmin;

    @Column({ name: "receberPedidoResidencia", type: 'boolean' })
    receberPedidoResidencia: boolean | null;

    @Column({ name: "observacaoCliente", type: 'text' })
    observacaoCliente: string | null;

    @Column({ name: "pedidoRealizadoLojaVirtual", type: 'boolean' })
    pedidoRealizadoLojaVirtual: boolean;

    @Column({ name: "idPedidoEmSistemaPagamentoExterno", type: 'character varying' })
    idPedidoEmSistemaPagamentoExterno: string | null;

    @Column({ name: "dataCriacao", type: 'timestamp' })
    dataCriacao: Date;

    @Column({ name: "dataAtualizacao", type: 'timestamp' })
    dataAtualizacao: Date;

    novoPedido(dados: {
        dataEmissaoPedido: string,
        usuarioRegistroPedidoId: number,
        situacaoExternaPedidoId: number,
        tipoPagamentoPedidoId: number | null,
        clienteId: number,
        tipoPedidoId: number,
        dataPrevisaoEntrega: string | null,
        tamanhoItensPedido: string | null,
        dataFinalizacaoPedido: string | null,
        idUsuarioResponsavelPedido: number | null,
        itensPedido: {
            quantidade: number,
            idProduto: number,
            idSituacaoExternaItemPedido: number,
            idSituacaoInternaItemPedido: number,
            valorUnitario: string,
            nomeFuncionarioResponsavel: string | null
        }[]
    }) {
        this.dataEmissaoPedido = dados.dataEmissaoPedido;
        this.usuarioRegistroPedidoId = dados.usuarioRegistroPedidoId;
        this.situacaoExternaPedidoId = dados.situacaoExternaPedidoId;
        this.tipoPagamentoPedidoId = dados.tipoPagamentoPedidoId;
        this.clienteId = dados.clienteId;
        this.tipoPedidoId = dados.tipoPedidoId;
        this.dataPrevisaoEntrega = dados.dataPrevisaoEntrega;
        this.tamanhoItensPedido = dados.tamanhoItensPedido;
        this.dataFinalizacaoPedido = dados.dataFinalizacaoPedido;
        this.usuarioResponsavelPedidoId = dados.idUsuarioResponsavelPedido;
        this.receberPedidoResidencia = null;
        this.observacaoCliente = null;
        this.pedidoRealizadoLojaVirtual = false;
        this.idPedidoEmSistemaPagamentoExterno = null;
        this.id2 = null;

        this.itensPedido = new Array<PedidoItem>();
        this.itensPedido = dados.itensPedido.map((item: any) => {
            const novoPedidoItem = new PedidoItem();
            novoPedidoItem.novoPedidoItem({
                id: null,
                idPedido: this.id,
                quantidade: item.quantidade,
                idProduto: item.idProduto,
                idSituacaoInternaItemPedido: item.idSituacaoInternaItemPedido,
                idSituacaoExternaItemPedido: item.idSituacaoExternaItemPedido,
                valorUnitario: item.valorUnitario,
                nomeFuncionarioResponsavel: item.nomeFuncionarioResponsavel
            });
            return novoPedidoItem;
        });

        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    novoPedidoLojaVirtual(dados: {
        clienteId: number,
        tamanhoItensPedido: string | null,
        receberPedidoResidencia: boolean,
        observacaoCliente: string,
        itensPedido: {
            quantidade: number,
            idProduto: number,
            valorUnitario: string
        }[]
    }) {
        this.dataEmissaoPedido = dataAAAAMMDD(new Date());
        this.usuarioRegistroPedidoId = IdsUsuariosAdminConstante.LojaAppWeb;
        this.situacaoExternaPedidoId = IdsSituacoesExternasPedidoConstante.AguardandoPagamento;
        this.tipoPagamentoPedidoId = null;
        this.clienteId = dados.clienteId;
        this.tipoPedidoId = IdTiposPedidosConstante.NovoPedido;
        this.dataPrevisaoEntrega = null;
        this.tamanhoItensPedido = dados.tamanhoItensPedido;
        this.dataFinalizacaoPedido = null;
        this.usuarioResponsavelPedidoId = null;
        this.receberPedidoResidencia = dados.receberPedidoResidencia;
        this.observacaoCliente = dados.observacaoCliente;
        this.pedidoRealizadoLojaVirtual = true;
        this.idPedidoEmSistemaPagamentoExterno = null;
        this.id2 = gerarGuid();

        this.itensPedido = new Array<PedidoItem>();
        this.itensPedido = dados.itensPedido.map((item: any) => {
            const novoPedidoItem = new PedidoItem();
            novoPedidoItem.novoPedidoItemOriundoLojaVirtual({
                id: null,
                idPedido: this.id,
                quantidade: item.quantidade,
                idProduto: item.idProduto,
                valorUnitario: item.valorUnitario
            });
            return novoPedidoItem;
        });

        this.dataCriacao = new Date();
        this.dataAtualizacao = new Date();
    }

    editar(dados: {
        idTipoPedido: number,
        dataEmissaoPedido: string,
        idSituacaoExternaPedido: number,
        idTipoPagamento: number | null,
        dataPrevisaoEntrega: string | null,
        dataFinalizacaoPedido: string | null,
        idClienteVinculadoPedido: number,
        tamanhoItensPedido: string | null,
        idUsuarioResponsavelPedido: number | null
    }) {
        this.tipoPedidoId = dados.idTipoPedido;
        this.dataEmissaoPedido = dados.dataEmissaoPedido;
        this.situacaoExternaPedidoId = dados.idSituacaoExternaPedido;
        this.tipoPagamentoPedidoId = dados.idTipoPagamento;
        this.dataPrevisaoEntrega = dados.dataPrevisaoEntrega;
        this.dataFinalizacaoPedido = dados.dataFinalizacaoPedido;
        this.clienteId = dados.idClienteVinculadoPedido;
        this.tamanhoItensPedido = dados.tamanhoItensPedido;
        this.usuarioResponsavelPedidoId = dados.idUsuarioResponsavelPedido;
    }

    confirmarPagamentoExterno() {
        this.situacaoExternaPedidoId = IdsSituacoesExternasPedidoConstante.EmAndamento;
        this.tipoPagamentoPedidoId = IdsTiposPagamentoConstante.PagSeguro;
    }

    inserirIdPedidoSistemaPagamentoExterno(id: string) {
        this.idPedidoEmSistemaPagamentoExterno = id;
    }

    inserirDadosEntrega(dados: {
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
        this.receberPedidoResidencia = true;
        const dadosEntrega = new PedidoDadosEntrega();
        dadosEntrega.novoDadosEntrega({
            idPedido: this.id,
            nomeRecebedor: dados.nomeRecebedor,
            logradouro: dados.logradouro,
            complemento: dados.complemento,
            cep: dados.cep,
            nomeCidade: dados.nomeCidade,
            siglaUf: dados.siglaUf,
            telefone: dados.telefone,
            email: dados.email,
            descricaoFrete: dados.descricaoFrete,
            valorFrete: dados.valorFrete
        });
    }
}
