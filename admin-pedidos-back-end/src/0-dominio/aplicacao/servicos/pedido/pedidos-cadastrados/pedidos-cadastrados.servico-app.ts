import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { PedidoRepositorio } from "../../../../repositorios/pedido.repositorio";

export class PedidosCadastradosServicoApp extends ServicoAplicacao {
    private readonly _pedidoRepositorio = new PedidoRepositorio();

    async executar() {
        const opcoesBusca: any = {};
        opcoesBusca.entidadesRelacionadas = ['itensPedido'];
        opcoesBusca.ordenacao = { id: 'DESC' };

        const pedidos = await this._pedidoRepositorio.retornarColecaoEntidade(opcoesBusca);
        return this.retornoSucesso(pedidos);
    }
}