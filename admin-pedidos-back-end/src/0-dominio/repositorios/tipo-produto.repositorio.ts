import { Repositorio } from '../../0-core/dominio/repositorios/repositorio';
import { TipoProduto } from '../entidades/tipo-produto';
import { TabelasBancoDados } from '../../0-core/infra/dados/tabelas-banco-dados.app';

export class TipoProdutoRepositorio extends Repositorio<TipoProduto> {
    constructor() {
        super(TabelasBancoDados.TIPO_PRODUTO);
    }
}