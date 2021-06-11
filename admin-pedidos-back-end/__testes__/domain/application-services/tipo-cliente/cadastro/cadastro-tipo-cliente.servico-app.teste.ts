import { limpezaDadosInicioTeste } from "../../../../helpers/limpeza-banco-dados";
import { CadastroTipoClienteAppService } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.app-service";
import { ValidacaoDados } from "../../../../../src/core/helpers/validacao-dados";
import { TipoClienteRepositorio } from "../../../../../src/infra/data/repositories/tipo-cliente.repositorio";
import { CadastroTipoClienteRequest } from "../../../../../src/domain/application-services/tipo-cliente/cadastro/cadastro-tipo-cliente.request";

describe("CadastroTipoClienteAppService", () => {

    beforeEach(async () => {
        await limpezaDadosInicioTeste();
    });
    
    it("retornar erro quando Id for menor que 1", async () => {
        //arrange
        const servicoApp = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepositorio()
        );

        const response = await servicoApp.executar({
            id: 0,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(response);

        expect(response.sucesso).toBe(false);
    });

    it("retornar erro quando Id for maior que 999", async () => {
        //arrange
        const servicoApp = new CadastroTipoClienteAppService(
            new ValidacaoDados(),
            new TipoClienteRepositorio()
        );

        const response = await servicoApp.executar({
            id: 1000,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteRequest);

        console.log(response);

        expect(response.sucesso).toBe(false);
    });
});