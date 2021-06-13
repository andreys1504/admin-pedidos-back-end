import { EdicaoClienteRequest } from "./edicao-cliente.request";
import { ClientesParaEdicaoDadosAppService } from "../clientes-para-edicao-dados/clientes-para-edicao-dados.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { Cliente } from "../../../entities";
import { ClientesParaEdicaoDadosRequest } from "../clientes-para-edicao-dados/clientes-para-edicao-dados.request";

export class EdicaoClienteAppService extends AppService<Cliente> {
  private readonly clienteRepository = new ClienteRepository();
  private readonly clientesParaEdicaoDadosAppService =
    new ClientesParaEdicaoDadosAppService();

  async handleAsync(request: EdicaoClienteRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const dadosEdicao = request.requestModel;

    const opcoesBuscaClienteEdicao: any = {};
    opcoesBuscaClienteEdicao.filtro = { id: dadosEdicao.idCliente };
    const clienteEdicao = await this.clienteRepository.entidadeAsync(
      opcoesBuscaClienteEdicao
    );
    if (!clienteEdicao) {
      throw new Error("CLIENTE inválido");
    }

    clienteEdicao.editar({
      cep: dadosEdicao.cep,
      email: dadosEdicao.email,
      logradouro: dadosEdicao.logradouro,
      nome: dadosEdicao.nome,
      nomeCidade: dadosEdicao.nomeCidade,
      nomeGuerra: dadosEdicao.nomeGuerra,
      siglaUf: dadosEdicao.siglaUf,
      telefone: dadosEdicao.telefone,
      idTipoCliente: dadosEdicao.idTipoCliente,
      tipoSanguineo: dadosEdicao.tipoSanguineo,
      medidasCliente: dadosEdicao.medidasCliente,
    });

    await this.clienteRepository.salvarAsync(clienteEdicao);
    const clienteRetorno =
      await this.clientesParaEdicaoDadosAppService.handleAsync(
        new ClientesParaEdicaoDadosRequest({
          nomeCpfCnpj: clienteEdicao.cpfCnpj,
        })
      );

    let retorno: Cliente = {} as Cliente;
    if (clienteRetorno?.data !== null && clienteRetorno?.data?.length > 0)
      retorno = clienteRetorno.data[0];

    return this.returnData(retorno);
  }
}
