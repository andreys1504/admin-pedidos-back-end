import { DatabaseTables } from "../../../core/infra/data/database-tables";
import { RepositoryBase } from "../../../core/infra/data/repository";
import { TipoProduto } from "../../../domain/entities";

export class TipoProdutoRepositorio extends RepositoryBase<TipoProduto> {
    constructor() {
        super(DatabaseTables.TIPO_PRODUTO);
    }
}