import { CadastroTipoClienteAppService } from '../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service';
import { TipoClienteRepository } from '../../../../../src/infra/data/repositories/tipo-cliente.repository';
import { CadastroTipoClienteRequest } from '../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.request';
import { TipoCliente } from '../../../../../src/domain/entities/tipo-cliente';
import { start, close } from '../../../../helpers/base-tests';

describe('CadastroTipoClienteAppService', () => {
    
  beforeAll(async () => {
    await start();
  });

  afterAll(async () => {
    await close();
  });

  it('retornar notificação quando Id informado for menor que '1'', async () => {
    //arrange
    const appService = new CadastroTipoClienteAppService(
      new TipoClienteRepository()
    );

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: 0,
        descricao: 'Bombeiro',
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

  it('retornar notificação quando Id informado for maior que 999', async () => {
    //arrange
    const appService = new CadastroTipoClienteAppService(
      new TipoClienteRepository()
    );

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: 1000,
        descricao: 'Bombeiro',
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

  it('retornar notificação quando Descrição não for informada', async () => {
    //arrange
    const appService = new CadastroTipoClienteAppService(
      new TipoClienteRepository()
    );

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: 1,
        descricao: '',
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

  it('retornar notificação quando Descrição informada tiver menos de 2 caracteres', async () => {
    //arrange
    const appService = new CadastroTipoClienteAppService(
      new TipoClienteRepository()
    );

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: 1,
        descricao: 'B',
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

  it('retornar notificação quando Descrição informada tiver mais de 45 caracteres', async () => {
    //arrange
    const appService = new CadastroTipoClienteAppService(
      new TipoClienteRepository()
    );

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: 1,
        descricao: 'Bombeiros exército aeronáutica polícia militar',
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

  it('retornar notificação quando Id informado já existir no repositório', async () => {
    //arrange
    const tipoClienteBombeiro = new TipoCliente();
    tipoClienteBombeiro.novoTipoCliente({
      id: 2,
      descricao: 'Bombeiro',
      ativo: true,
    });

    var repository = new TipoClienteRepository();
    await repository.salvarAsync(tipoClienteBombeiro);

    const appService = new CadastroTipoClienteAppService(repository);

    //act
    const responseAppService = await appService.handleAsync(
      new CadastroTipoClienteRequest({
        id: tipoClienteBombeiro.id + 1,
        descricao: tipoClienteBombeiro.descricao,
        ativo: true,
      })
    );

    console.log(responseAppService);

    //assert
    expect(responseAppService.success).toBe(false);
  });

});
