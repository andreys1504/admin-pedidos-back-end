import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoClienteRepositorio } from "../../../../repositorios/tipo-cliente.repositorio";

export class TiposClienteServicoApp extends ServicoAplicacao {
    private readonly _tipoClienteRepositorio = new TipoClienteRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao', 'ativo'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        const tiposCliente = await this._tipoClienteRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposCliente);
    }
}