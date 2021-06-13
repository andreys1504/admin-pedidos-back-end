import { DatabaseTables } from "../../../core/infra/data/database-tables";
import { RepositoryBase } from "../repository";
import { TipoProduto } from "../../../domain/entities";

export class TipoProdutoRepository extends RepositoryBase<TipoProduto> {
    constructor() {
        super(DatabaseTables.TIPO_PRODUTO);
    }
}