import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";
import { TipoCliente } from "../../../entities";
import { CadastroTipoClienteRequest } from "./cadastro-tipo-cliente.request";

export class CadastroTipoClienteAppService extends AppService<any> {
  constructor(private readonly tipoClienteRepository: TipoClienteRepository) {
    super();
  }

  async handleAsync(request: CadastroTipoClienteRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const opcoesBuscaPorId: any = {};
    opcoesBuscaPorId.camposRetorno = ["id"];
    opcoesBuscaPorId.filtro = { id: request.requestModel.id };
    if (await this.tipoClienteRepository.entidadeAsync(opcoesBuscaPorId)) {
      return this.returnNotification("id", "ID já existente no sistema");
    }

    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.camposRetorno = ["id"];
    opcoesBuscaPorDescricao.filtro = {
      descricao: request.requestModel.descricao,
    };
    if (
      await this.tipoClienteRepository.entidadeAsync(opcoesBuscaPorDescricao)
    ) {
      return this.returnNotification(
        "descricao",
        "DESCRIÇÃO já existente no sistema"
      );
    }

    const tipoCliente = new TipoCliente();
    tipoCliente.novoTipoCliente({
      id: request.requestModel.id,
      descricao: request.requestModel.descricao,
      ativo: request.requestModel.ativo,
    });
    await this.tipoClienteRepository.salvarAsync(tipoCliente);

    return this.returnSuccess();
  }
}
