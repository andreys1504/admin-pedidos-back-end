import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { getNumbersText } from "../../../../core/helpers";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { TipoClienteRepository } from "../../../../infra/data/repositories/tipo-cliente.repository";
import { Cliente, TipoCliente } from "../../../entities";
import { ClientesParaEdicaoDadosRequest } from "./clientes-para-edicao-dados.request";

export class ClientesParaEdicaoDadosAppService extends AppService<Cliente[]> {
  private readonly tipoClienteRepository = new TipoClienteRepository();
  private readonly clienteRepository = new ClienteRepository();

  async handleAsync(request: ClientesParaEdicaoDadosRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const clientes = await this.buscarClientesParaEdicaoDados(
      request.requestModel.nomeCpfCnpj
    );

    return this.returnData(clientes);
  }

  private async buscarClientesParaEdicaoDados(nomeCpfCnpj: string) {
    let clientes: Cliente[] = [];

    const tiposClientes =
      await this.tipoClienteRepository.entidadesAsync({
        camposRetorno: ["id", "descricao"],
      });

    const opcoesBusca: any = {};

    const cpfCnpj = getNumbersText(nomeCpfCnpj);
    if (cpfCnpj) {
      opcoesBusca.filtro = { cpfCnpj };
      clientes = await this.clienteRepository.entidadesAsync(
        opcoesBusca
      );
    } else {
      opcoesBusca.filtro = { nome: nomeCpfCnpj };
      clientes = await this.clienteRepository.clientesPorConteudoNome(
        opcoesBusca
      );
    }

    if (
      clientes &&
      clientes.length > 0 &&
      tiposClientes &&
      tiposClientes.length > 0
    )
      clientes = this.vincularTipoCliente({ clientes, tiposClientes });

    return clientes;
  }

  private vincularTipoCliente(dados: {
    clientes: Cliente[];
    tiposClientes: TipoCliente[];
  }) {
    dados.clientes = dados.clientes.map((cliente) => {
      cliente.tipoCliente =
        dados.tiposClientes.find(
          (tipoCliente) => tipoCliente.id === cliente.tipoClienteId
        ) || ({} as TipoCliente);

      return cliente;
    });

    return dados.clientes;
  }
}
