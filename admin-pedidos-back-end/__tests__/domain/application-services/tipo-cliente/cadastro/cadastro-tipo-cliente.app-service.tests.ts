import { CadastroTipoClienteAppService } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { ValidacaoDados } from "../../../../../src/core/helpers/validacao-dados";
import { TipoClienteRepository } from "../../../../../src/infra/data/repositories/tipo-cliente.repository";
import { CadastroTipoClienteRequest } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.request";
import { TipoCliente } from "../../../../../src/domain/entities/tipo-cliente";
import { clearData } from "../../../../helpers/startup-tests";

describe("CadastroTipoClienteAppService", () => {

    beforeEach(async () => {
        await clearData();
    });
    
    it("retornar notificação quando Id informado for menor que '1'", async () => {
        //arrange
        const appService = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepository()
        );

        //act
        const responseAppService = await appService.handle({
            id: 0,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(responseAppService);

        //assert
        expect(responseAppService.success).toBe(false);
    });

    it("retornar notificação quando Id informado for maior que 999", async () => {
        //arrange
        const appService = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepository()
        );

        //act
        const responseAppService = await appService.handle({
            id: 1000,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(responseAppService);

        //assert
        expect(responseAppService.success).toBe(false);
    });

    it("retornar notificação quando Id informado já existir no repositório", async () => {
        //arrange
        const tipoClienteBombeiro = new TipoCliente();
        tipoClienteBombeiro.novoTipoCliente({
            id: 2,
            descricao: "Bombeiro",
            ativo: true
        });

        var repository = new TipoClienteRepository();
        await repository.salvarEntidade(tipoClienteBombeiro);

        const appService = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            repository
        );

        //act
        const responseAppService = await appService.handle({
            id: tipoClienteBombeiro.id + 1,
            descricao: tipoClienteBombeiro.descricao,
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(responseAppService);

        //assert
        expect(responseAppService.success).toBe(false);
    });
});