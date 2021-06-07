import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao"
import { CadastroProdutoViewModelServicoApp } from "./cadastro-produto.view-model.servico-app";
import { ValidacaoDados } from "../../../../../0-core/helpers";
import { ProdutoRepositorio } from "../../../../repositorios/produto.repositorio";
import { Produto } from "../../../../entidades";
import { envioImagensProdutosStorageServico } from "../../../../../1-infra/servicos/storage-arquivos-aplicacoes/envio-imagens-produtos/envio-imagens-produtos-storage.servico";

export class CadastroProdutoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _produtoRepositorio = new ProdutoRepositorio();

    async executar(model: CadastroProdutoViewModelServicoApp) {
        const dadosCadastro = this.validarCadastro(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

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
        await this._produtoRepositorio.salvarEntidade(produto);
        return this.retornoSucesso(produto);
    }

    private validarCadastro(dadosCadastro: CadastroProdutoViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosCadastro.descricao, 'DESCRIÇÃO obrigatória');
        this._validacaoDados.tamanhoMinimo(dadosCadastro.descricao, 3, 'DESCRIÇÃO inválida');
        this._validacaoDados.tamanhoMaximo(dadosCadastro.descricao, 150, 'DESCRIÇÃO inválida');

        this._validacaoDados.tamanhoMinimo(dadosCadastro.detalhesProduto, 5, 'DESTALHES inválido');

        dadosCadastro.valorUnitario = dadosCadastro.valorUnitario.replace('.', '').replace(',', '.');
        this._validacaoDados.obrigatorio(dadosCadastro.valorUnitario, 'VALOR obrigatório');
        this._validacaoDados.precoZerado(dadosCadastro.valorUnitario, 'VALOR obrigatório');

        this._validacaoDados.obrigatorio(dadosCadastro.idTipoProduto, 'Informe CATEGORIA');

        return dadosCadastro;
    }

    private async produtoPorDescricao(descricao: string) {
        const opcoesBuscaIdProduto: any = {};
        opcoesBuscaIdProduto.filtro = { descricao };
        opcoesBuscaIdProduto.camposRetorno = ['id'];

        return await this._produtoRepositorio.retornarEntidade(opcoesBuscaIdProduto);
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