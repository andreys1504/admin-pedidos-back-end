import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";
import { TipoCliente } from "../../../entities";

export class TiposClienteAppService extends AppService<TipoCliente[]> {
  private readonly tipoClienteRepository = new TipoClienteRepository();

  async handleAsync() {
    const opcoesBusca: any = { camposRetorno: ["id", "descricao", "ativo"] };
    opcoesBusca.ordenacao = { descricao: "ASC" };
    const tiposCliente =
      await this.tipoClienteRepository.entidadesAsync(opcoesBusca);

    return this.returnData(tiposCliente);
  }
}
