import { EdicaoProdutoRequest } from "./edicao-produto.request";
import { ProdutosParaEdicaoAppService } from "../produtos-para-edicao/produtos-para-edicao.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { Nao, ValidacaoDados } from "../../../../core/helpers";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { ProdutoImagens } from "../../../entities/produto-imagens";
import { envioImagensProdutosStorageServico } from "../../../../infra/service/storage-files-service";

export class EdicaoProdutoAppService extends AppService {
    private readonly validacaoDados = new ValidacaoDados();
    private readonly produtoRepository = new ProdutoRepository();
    private readonly produtosParaEdicaoAppService = new ProdutosParaEdicaoAppService();

    async handle(request: EdicaoProdutoRequest) {
        const dadosEdicao = this.validarEdicao(request);

        if (!this.validacaoDados.valido())
            return this.returnNotifications(this.validacaoDados.recuperarErros());

        const produtoEdicao = await this.produtoParaEdicao(request.idProduto);
        if (!produtoEdicao)
            throw new Error('produto inválido');

        if (produtoEdicao.descricao != dadosEdicao.descricao) {
            const produtoPorDescricao = await this.idProdutoPorDescricao({
                novaDescricao: dadosEdicao.descricao,
                idProduto: request.idProduto
            });

            if (produtoPorDescricao)
                return this.returnNotifications([{ mensagem: `PRODUTO (${dadosEdicao.descricao}) existente no sistema` }]);
        }

        const imagensAtuais = await this.produtoRepository.imagensProduto(produtoEdicao.id);

        let nomesImagensProdutoParaAlteracao = [] as ProdutoImagens[];

        nomesImagensProdutoParaAlteracao = await this.configurarImagensProduto({
            novasImagensEmBase64: request.novasImagensDestaqueEmBase64,
            nomesImagensAtuaisProduto: imagensAtuais.filter(x => x.imagemDestaque === true).map(x => x.nomeArquivo),
            nomesImagensAtuaisParaAlteracao: request.imagensDestaqueOriginais,
            idProduto: produtoEdicao.id,
            imagemDestaque: true
        });

        (await this.configurarImagensProduto({
            novasImagensEmBase64: request.novasDemaisImagensEmBase64,
            nomesImagensAtuaisProduto: imagensAtuais.filter(x => x.imagemDestaque === false).map(x => x.nomeArquivo),
            nomesImagensAtuaisParaAlteracao: request.demaisImagensOriginais,
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

        await this.produtoRepository.editar({ produtoEdicao, imagensProduto: nomesImagensProdutoParaAlteracao });

        const produtoRetorno = await this.produtosParaEdicaoAppService.handle({
            descricao: '',
            idProduto: produtoEdicao.id
        });

        return this.returnSuccess(produtoRetorno.data[0]);
    }

    private validarEdicao(dadosEdicao: EdicaoProdutoRequest) {
        this.validacaoDados.obrigatorio(dadosEdicao.descricao, 'DESCRIÇÃO obrigatória');
        this.validacaoDados.tamanhoMinimo(dadosEdicao.descricao, 3, 'DESCRIÇÃO inválida');
        this.validacaoDados.tamanhoMaximo(dadosEdicao.descricao, 65, 'DESCRIÇÃO inválida');

        this.validacaoDados.tamanhoMinimo(dadosEdicao.detalhesProduto, 5, 'DESTALHES inválido');

        dadosEdicao.valorUnitario = dadosEdicao.valorUnitario.replace('.', '').replace(',', '.');
        this.validacaoDados.obrigatorio(dadosEdicao.valorUnitario, 'VALOR obrigatório');
        this.validacaoDados.precoZerado(dadosEdicao.valorUnitario, 'VALOR obrigatório');

        this.validacaoDados.obrigatorio(dadosEdicao.idTipoProduto, 'Informe CATEGORIA');

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

        return await this.produtoRepository.retornarEntidade(opcoesBuscaPorDescricao);
    }

    private async produtoParaEdicao(idProduto: number) {
        const opcoesBusca: any = {};
        opcoesBusca.filtro = { id: idProduto };
        return await this.produtoRepository.retornarEntidade(opcoesBusca);
    }
}
