import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ClienteRepository } from "../../../../infra/data/repositories/cliente.repository";
import { Cliente } from "../../../entities";
import { CadastroClienteRequest } from "./cadastro-cliente.request";

export class CadastroClienteAppService extends AppService<Cliente> {
  private readonly clienteRepository = new ClienteRepository();

  async handleAsync(request: CadastroClienteRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const dadosCadastro = request.requestModel;

    let opcoesBuscaPorCpfCnpj: any = {
      camposRetorno: ["id"],
      filtro: { cpfCnpj: dadosCadastro.cpfCnpj },
    };
    if (await this.clienteRepository.entidadeAsync(opcoesBuscaPorCpfCnpj)) {
      return this.returnNotification(
        "cpfCnpj",
        "CPF/CNPJ já existente no sistema"
      );
    }

    const novoCliente = new Cliente();
    novoCliente.novoCliente({
      nome: dadosCadastro.nome,
      nomeGuerra: dadosCadastro.nomeGuerra,
      idTipoCliente: dadosCadastro.idTipoCliente,
      cpfCnpj: dadosCadastro.cpfCnpj,
      logradouro: dadosCadastro.logradouro,
      cep: dadosCadastro.cep,
      nomeCidade: dadosCadastro.nomeCidade,
      siglaUf: dadosCadastro.siglaUf,
      telefone: dadosCadastro.telefone,
      email: dadosCadastro.email,
      tipoSanguineo: dadosCadastro.tipoSanguineo,
      medidasCliente: dadosCadastro.medidasCliente,
    });
    await this.clienteRepository.salvarAsync(novoCliente);

    return this.returnData(novoCliente);
  }
}
