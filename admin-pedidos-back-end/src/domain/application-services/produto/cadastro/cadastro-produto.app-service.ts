import { envioImagensProdutosStorageServico } from "../../../../apis/security/storage-arquivos-aplicacoes/envio-imagens-produtos/envio-imagens-produtos-storage.servico";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ValidacaoDados } from "../../../../core/helpers";
import { ProdutoRepositorio } from "../../../../infra/data/repositories/produto.repositorio";
import { Produto } from "../../../entities";
import { CadastroProdutoRequest } from "./cadastro-produto.request";

export class CadastroProdutoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly produtoRepositorio = new ProdutoRepositorio();

    async executar(model: CadastroProdutoRequest) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this.validacaoDados.valido())
            return this.retornoErro(this.validacaoDados.recuperarErros());

        if ((await this.produtoPorDescricao(model.descricao)))
            return this.retornoErro([{ mensagem: `PRODUTO (${dadosCadastro.descricao}) existente no sistema` }]);

        let nomesImagensDestaque = await this.configurarImagensProduto(model.imagensDestaqueEmBase64);
        let nomesDemaisImagens = await this.configurarImagensProduto(model.demaisImagensEmBase64);

        const produto = new Produto();
        produto.novoProduto({
            descricao: dadosCadastro.descricao,
            valorUnitario: dadosCadastro.valorUnitario,
            nomesImagensDestaque,
            idTipoProduto: dadosCadastro.idTipoProduto,
            nomesDemaisImagens,
            detalhesProduto: model.detalhesProduto,
            destaqueTelaPrincipal: model.destaqueTelaPrincipal
        });
        await this.produtoRepositorio.salvarEntidade(produto);
        return this.retornoSucesso(produto);
    }

    private validarCadastro(dadosCadastro: CadastroProdutoRequest) {
        this.validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 3, 'DESCRIÇÃO inválida');
        this.validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 150, 'DESCRIÇÃO inválida');

        this.validacaoDados.tamanhoMinimo(dadosCadastro.detalhesProduto, 5, 'DESTALHES inválido');

        dadosCadastro.valorUnitario = dadosCadastro.valorUnitario.replace('.', '').replace(',', '.');
        this.validacaoDados.obrigatorio(dadosCadastro.valorUnitario, 'VALOR obrigatório');
        this.validacaoDados.precoZerado(dadosCadastro.valorUnitario, 'VALOR obrigatório');

        this.validacaoDados.obrigatorio(dadosCadastro.idTipoProduto, 'Informe CATEGORIA');

        return dadosCadastro;
    }

    private async produtoPorDescricao(descricao: string) {
        const opcoesBuscaIdProduto: any = {};
        opcoesBuscaIdProduto.filtro = { descricao };
        opcoesBuscaIdProduto.camposRetorno = ['id'];

        return await this.produtoRepositorio.retornarEntidade(opcoesBuscaIdProduto);
    }

    private async configurarImagensProduto(imagensEmBase64: string[]) {
        let nomesImagens = [] as string[];
        if (imagensEmBase64 && imagensEmBase64.length > 0)
            nomesImagens = await Promise.all(imagensEmBase64.map(async imagem => {
                return (await envioImagensProdutosStorageServico.enviarImagem(imagem));
            }));

        return nomesImagens;
    }
}
