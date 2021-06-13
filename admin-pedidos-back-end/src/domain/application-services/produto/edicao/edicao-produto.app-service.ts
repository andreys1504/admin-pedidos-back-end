import { EdicaoProdutoRequest } from "./edicao-produto.request";
import { ProdutosParaEdicaoAppService } from "../produtos-para-edicao/produtos-para-edicao.app-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { Not } from "../../../../core/helpers";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { ProdutoImagens } from "../../../entities/produto-imagens";
import { envioImagensProdutosStorageServico } from "../../../../infra/service/storage-files-service";
import { Produto } from "../../../entities";
import { ProdutosParaEdicaoRequest } from "../produtos-para-edicao/produtos-para-edicao.request";
import { DomainException } from "../../../../core/domain/exceptions/domain.exception";

export class EdicaoProdutoAppService extends AppService<Produto> {
  private readonly produtoRepository = new ProdutoRepository();
  private readonly produtosParaEdicaoAppService =
    new ProdutosParaEdicaoAppService();

  async handleAsync(request: EdicaoProdutoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const produtoEdicao = await this.produtoParaEdicao(
      request.requestModel.idProduto
    );
    if (!produtoEdicao) {
      throw new DomainException("produto inválido");
    }

    if (produtoEdicao.descricao != request.requestModel.descricao) {
      const produtoPorDescricao = await this.idProdutoPorDescricao({
        novaDescricao: request.requestModel.descricao,
        idProduto: request.requestModel.idProduto,
      });

      if (produtoPorDescricao) {
        return this.returnNotification(
          "descricao",
          `PRODUTO (${request.requestModel.descricao}) existente no sistema`
        );
      }
    }

    const imagensAtuais = await this.produtoRepository.imagensProduto(
      produtoEdicao.id
    );

    let nomesImagensProdutoParaAlteracao = [] as ProdutoImagens[];

    nomesImagensProdutoParaAlteracao = await this.configurarImagensProduto({
      novasImagensEmBase64: request.requestModel.novasImagensDestaqueEmBase64,
      nomesImagensAtuaisProduto: imagensAtuais
        .filter((x) => x.imagemDestaque === true)
        .map((x) => x.nomeArquivo),
      nomesImagensAtuaisParaAlteracao:
        request.requestModel.imagensDestaqueOriginais,
      idProduto: produtoEdicao.id,
      imagemDestaque: true,
    });

    (
      await this.configurarImagensProduto({
        novasImagensEmBase64: request.requestModel.novasDemaisImagensEmBase64,
        nomesImagensAtuaisProduto: imagensAtuais
          .filter((x) => x.imagemDestaque === false)
          .map((x) => x.nomeArquivo),
        nomesImagensAtuaisParaAlteracao:
          request.requestModel.demaisImagensOriginais,
        idProduto: produtoEdicao.id,
        imagemDestaque: false,
      })
    ).map((x) => nomesImagensProdutoParaAlteracao.push(x));

    produtoEdicao.editar({
      descricao: request.requestModel.descricao,
      valorUnitario: request.requestModel.valorUnitario,
      idTipoProduto: request.requestModel.idTipoProduto,
      detalhesProduto: request.requestModel.detalhesProduto,
      destaqueTelaPrincipal: request.requestModel.destaqueTelaPrincipal,
    });

    await this.produtoRepository.editar({
      produtoEdicao,
      imagensProduto: nomesImagensProdutoParaAlteracao,
    });

    const produtoRetorno = await this.produtosParaEdicaoAppService.handleAsync(
      new ProdutosParaEdicaoRequest({
        descricao: "",
        idProduto: produtoEdicao.id,
      })
    );

    let retorno = {} as Produto;
    if (produtoRetorno?.data !== null && produtoRetorno?.data?.length > 0)
      retorno = produtoRetorno.data[0];

    return this.returnData(retorno);
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
      nomesNovasImagens = await Promise.all(
        dados.novasImagensEmBase64.map(async (imagem) => {
          return await envioImagensProdutosStorageServico.enviarImagem(imagem);
        })
      );

    if (
      dados.nomesImagensAtuaisProduto &&
      dados.nomesImagensAtuaisProduto.length > 0 &&
      dados.nomesImagensAtuaisParaAlteracao &&
      dados.nomesImagensAtuaisParaAlteracao.length > 0
    )
      dados.nomesImagensAtuaisParaAlteracao.forEach((x) =>
        nomesNovasImagens.push(x)
      );

    return nomesNovasImagens.map((imagem) => {
      const produtoImagens = new ProdutoImagens();
      produtoImagens.novaImagem({
        nomeArquivo: imagem,
        idProduto: dados.idProduto,
        imagemDestaque: dados.imagemDestaque,
      });
      return produtoImagens;
    });
  }

  private async idProdutoPorDescricao(dados: {
    novaDescricao: string;
    idProduto: number;
  }) {
    const opcoesBuscaPorDescricao: any = {};
    opcoesBuscaPorDescricao.filtro = {
      descricao: dados.novaDescricao,
      id: Not(dados.idProduto),
    };
    opcoesBuscaPorDescricao.camposRetorno = ["id"];

    return await this.produtoRepository.entidadeAsync(
      opcoesBuscaPorDescricao
    );
  }

  private async produtoParaEdicao(idProduto: number) {
    const opcoesBusca: any = {};
    opcoesBusca.filtro = { id: idProduto };
    return await this.produtoRepository.entidadeAsync(opcoesBusca);
  }
}
