import { limpezaDadosInicioTeste } from "../../../../helpers/limpeza-banco-dados";
import { CadastroTipoClienteAppService } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { ValidacaoDados } from "../../../../../src/core/helpers/validacao-dados";
import { TipoClienteRepository } from "../../../../../src/infra/data/repositories/tipo-cliente.repository";
import { CadastroTipoClienteRequest } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.request";

describe("CadastroTipoClienteAppService", () => {

    beforeEach(async () => {
        await limpezaDadosInicioTeste();
    });
    
    it("retornar erro quando Id for menor que 1", async () => {
        //arrange
        const appService = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepository()
        );

        const responseAppService = await appService.handle({
            id: 0,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(responseAppService);

        expect(responseAppService.success).toBe(false);
    });

    it("retornar erro quando Id for maior que 999", async () => {
        //arrange
        const appService = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepository()
        );

        const responseAppService = await appService.handle({
            id: 1000,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(responseAppService);

        expect(responseAppService.success).toBe(false);
    });
});