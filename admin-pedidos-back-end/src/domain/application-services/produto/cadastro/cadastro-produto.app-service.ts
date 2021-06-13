import { envioImagensProdutosStorageServico } from "../../../../infra/service/storage-files-service";
import { AppService } from "../../../../core/domain/application-services/service/app-service";
import { ProdutoRepository } from "../../../../infra/data/repositories/produto.repository";
import { Produto } from "../../../entities";
import { CadastroProdutoRequest } from "./cadastro-produto.request";

export class CadastroProdutoAppService extends AppService<Produto> {
  private readonly produtoRepository = new ProdutoRepository();

  async handleAsync(request: CadastroProdutoRequest) {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const dadosCadastro = request.requestModel;

    if (await this.produtoPorDescricao(dadosCadastro.descricao)) {
      return this.returnNotification(
        "descricao",
        `PRODUTO (${dadosCadastro.descricao}) existente no sistema`
      );
    }

    let nomesImagensDestaque = await this.configurarImagensProduto(
      dadosCadastro.imagensDestaqueEmBase64
    );
    let nomesDemaisImagens = await this.configurarImagensProduto(
      dadosCadastro.demaisImagensEmBase64
    );

    const produto = new Produto();
    produto.novoProduto({
      descricao: dadosCadastro.descricao,
      valorUnitario: dadosCadastro.valorUnitario,
      nomesImagensDestaque,
      idTipoProduto: dadosCadastro.idTipoProduto,
      nomesDemaisImagens,
      detalhesProduto: request.requestModel.detalhesProduto,
      destaqueTelaPrincipal: request.requestModel.destaqueTelaPrincipal,
    });
    await this.produtoRepository.salvarAsync(produto);
    return this.returnData(produto);
  }

  private async produtoPorDescricao(descricao: string) {
    const opcoesBuscaIdProduto: any = {};
    opcoesBuscaIdProduto.filtro = { descricao };
    opcoesBuscaIdProduto.camposRetorno = ["id"];

    return await this.produtoRepository.entidadeAsync(opcoesBuscaIdProduto);
  }

  private async configurarImagensProduto(imagensEmBase64: string[]) {
    let nomesImagens = [] as string[];
    if (imagensEmBase64 && imagensEmBase64.length > 0)
      nomesImagens = await Promise.all(
        imagensEmBase64.map(async (imagem) => {
          return await envioImagensProdutosStorageServico.enviarImagem(imagem);
        })
      );

    return nomesImagens;
  }
}
