import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { TipoClienteRepositorio } from "../../../../repositorios/tipo-cliente.repositorio";

export class TiposClienteAtivosServicoApp extends ServicoAplicacao {
    private readonly _tipoClienteRepositorio = new TipoClienteRepositorio();

    async executar() {
        const opcoesBusca: any = { camposRetorno: ['id', 'descricao'] };
        opcoesBusca.ordenacao = { descricao: 'ASC' };
        opcoesBusca.filtro = { ativo: true };
        const tiposCliente = await this._tipoClienteRepositorio.retornarColecaoEntidade(opcoesBusca);

        return this.retornoSucesso(tiposCliente);
    }
}