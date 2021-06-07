import { EdicaoProdutoViewModelServicoApp } from "./edicao-produto.view-model.servico-app";
import { ValidacaoDados, Nao } from "../../../../../0-core/helpers";
import { ServicoAplicacao } from "../../../../../0-core/dominio/aplicacao/servico-aplicacao";
import { ProdutoRepositorio } from "../../../../repositorios/produto.repositorio";
import { ProdutosParaEdicaoServicoApp } from "../produtos-para-edicao/produtos-para-edicao.servico-app";
import { envioImagensProdutosStorageServico } from "../../../../../1-infra/servicos/storage-arquivos-aplicacoes/envio-imagens-produtos/envio-imagens-produtos-storage.servico";
import { ProdutoImagens } from "../../../../entidades/produto-imagens";

export class EdicaoProdutoServicoApp extends ServicoAplicacao {
    private readonly _validacaoDados = new ValidacaoDados();
    private readonly _produtoRepositorio = new ProdutoRepositorio();
    private readonly _produtosParaEdicaoServicoApp = new ProdutosParaEdicaoServicoApp();

    async executar(model: EdicaoProdutoViewModelServicoApp) {
        const dadosEdicao = this.validarEdicao(model);

        if (!this._validacaoDados.valido())
            return this.retornoErro(this._validacaoDados.recuperarErros());

        const produtoEdicao = await this.produtoParaEdicao(model.idProduto);
        if (!produtoEdicao)
            throw new Error('produto inválido');

        if (produtoEdicao.descricao != dadosEdicao.descricao) {
            const produtoPorDescricao = await this.idProdutoPorDescricao({
                novaDescricao: dadosEdicao.descricao,
                idProduto: model.idProduto
            });

            if (produtoPorDescricao)
                return this.retornoErro([{ mensagem: `PRODUTO (${dadosEdicao.descricao}) existente no sistema` }]);
        }

        const imagensAtuais = await this._produtoRepositorio.imagensProduto(produtoEdicao.id);

        let nomesImagensProdutoParaAlteracao = [] as ProdutoImagens[];

        nomesImagensProdutoParaAlteracao = await this.configurarImagensProduto({
            novasImagensEmBase64: model.novasImagensDestaqueEmBase64,
            nomesImagensAtuaisProduto: imagensAtuais.filter(x => x.imagemDestaque === true).map(x => x.nomeArquivo),
            nomesImagensAtuaisParaAlteracao: model.imagensDestaqueOriginais,
            idProduto: produtoEdicao.id,
            imagemDestaque: true
        });

        (await this.configurarImagensProduto({
            novasImagensEmBase64: model.novasDemaisImagensEmBase64,
            nomesImagensAtuaisProduto: imagensAtuais.filter(x => x.imagemDestaque === false).map(x => x.nomeArquivo),
            nomesImagensAtuaisParaAlteracao: model.demaisImagensOriginais,
            idProduto: produtoEdicao.id,
            imagemDestaque: false
        })).map(x => nomesImagensProdutoParaAlteracao.push(x));

        produtoEdicao.editar({
            descricao: dadosEdicao.descricao,
            valorUnitario: dadosEdicao.valorUnitario,
            idTipoProduto: dadosEdicao.idTipoProduto,
            detalhesProduto: dadosEdicao.detalhesProduto,
            destaqueTelaPrincipal: dadosEdicao.destaqueTelaPrincipal
        });

        await this._produtoRepositorio.editar({ produtoEdicao, imagensProduto: nomesImagensProdutoParaAlteracao });

        const produtoRetorno = await this._produtosParaEdicaoServicoApp.executar({
            descricao: '',
            idProduto: produtoEdicao.id
        });

        return this.retornoSucesso(produtoRetorno.dados[0]);
    }

    private validarEdicao(dadosEdicao: EdicaoProdutoViewModelServicoApp) {
        this._validacaoDados.obrigatorio(dadosEdicao.descricao, 'DESCRIÇÃO obrigatória');
        this._validacaoDados.tamanhoMinimo(dadosEdicao.descricao, 3, 'DESCRIÇÃO inválida');
        this._validacaoDados.tamanhoMaximo(dadosEdicao.descricao, 65, 'DESCRIÇÃO inválida');

        this._validacaoDados.tamanhoMinimo(dadosEdicao.detalhesProduto, 5, 'DESTALHES inválido');

        dadosEdicao.valorUnitario = dadosEdicao.valorUnitario.replace('.', '').replace(',', '.');
        this._validacaoDados.obrigatorio(dadosEdicao.valorUnitario, 'VALOR obrigatório');
        this._validacaoDados.precoZerado(dadosEdicao.valorUnitario, 'VALOR obrigatório');

        this._validacaoDados.obrigatorio(dadosEdicao.idTipoProduto, 'Informe CATEGORIA');

        return dadosEdicao;
    }

    private async configurarImagensProduto(dados: {
        novasImagensEmBase64: string[];
        nomesImagensAtuaisProduto: string[];
        nomesImagensAtuaisParaAlteracao: string[];
        idProduto: number;
        imagemDestaque: boolean;
    }) {
        let nomesNovasImagens = [] as string[];
        if (dados.novasImagensEmBase64 && dados.novasImagensEmBase64.length > 0)
            nomesNovasImagens = await Promise.all(dados.novasImagensEmBase64.map(async imagem => {
                return (await envioImagensProdutosStorageServico.enviarImagem(imagem));
            }));

        if (dados.nomesImagensAtuaisProduto && dados.nomesImagensAtuaisProduto.length > 0
            && dados.nomesImagensAtuaisParaAlteracao && dados.nomesImagensAtuaisParaAlteracao.length > 0)
            dados.nomesImagensAtuaisParaAlteracao.forEach(x => nomesNovasImagens.push(x));

        return nomesNovasImagens.map(imagem => {
            const produtoImagens = new ProdutoImagens();
            produtoImagens.novaImagem({
                nomeArquivo: imagem,
                idProduto: dados.idProduto,
                imagemDestaque: dados.imagemDestaque
            });
            return produtoImagens;
        });
    }

    private async idProdutoPorDescricao(dados: {
        novaDescricao: string,
        idProduto: number
    }) {
        const opcoesBuscaPorDescricao: any = {};
        opcoesBuscaPorDescricao.filtro = { descricao: dados.novaDescricao, id: Nao(dados.idProduto) }
        opcoesBuscaPorDescricao.camposRetorno = ['id'];

        return await this._produtoRepositorio.retornarEntidade(opcoesBuscaPorDescricao);
    }

    private async produtoParaEdicao(idProduto: number) {
        const opcoesBusca: any = {};
        opcoesBusca.filtro = { id: idProduto };
        return await this._produtoRepositorio.retornarEntidade(opcoesBusca);
    }
}