import { ValidacaoDados } from "../../../../../../../src/0-core/helpers/validacao-dados";
import { CadastroTipoClienteServicoApp } from "../../../../../../../src/0-dominio/aplicacao/servicos/tipo-cliente/cadastro/cadastro-tipo-cliente.servico-app";
import { CadastroTipoClienteViewModelServicoApp } from "../../../../../../../src/0-dominio/aplicacao/servicos/tipo-cliente/cadastro/cadastro-tipo-cliente.view-model.servico-app";
import { TipoClienteRepositorio } from "../../../../../../../src/0-dominio/repositorios/tipo-cliente.repositorio";
import { limpezaDadosInicioTeste } from "../../../../../../helpers/limpeza-banco-dados";

describe("CadastroTipoClienteServicoApp", () => {

    beforeEach(async () => {
        await limpezaDadosInicioTeste();
    });
    
    it("retornar erro quando Id for menor que 1", async () => {
        //arrange
        const servicoApp = new CadastroTipoClienteServicoApp(
            new ValidacaoDados(),
            new TipoClienteRepositorio()
        );

        const response = await servicoApp.executar({
            id: 0,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteViewModelServicoApp);

        console.log(response);

        expect(response.sucesso).toBe(false);
    });

    it("retornar erro quando Id for maior que 999", async () => {
        //arrange
        const servicoApp = new CadastroTipoClienteServicoApp(
            new ValidacaoDados(),
            new TipoClienteRepositorio()
        );

        const response = await servicoApp.executar({
            id: 1000,
            descricao: 'Bombeiro',
            ativo: true
        } as CadastroTipoClienteViewModelServicoApp);

        console.log(response);

        expect(response.sucesso).toBe(false);
    });
});