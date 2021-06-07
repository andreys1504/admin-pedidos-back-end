import { StatusCodeRespostas } from "../../../../../0-core/apis/controllers/status-code-respostas.app";
import { EdicaoClienteViewModelController } from "./edicao-cliente.view-model.controller";
import { ContextoRota } from "../../../../../0-core/apis/rotas/contexto-rota";
import { EdicaoServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/edicao/edicao.servico-app";
import { EdicaoViewModelServicoApp } from "../../../../../0-dominio/aplicacao/servicos/cliente/edicao/edicao.view-model.servico-app";
import { ControllerApiAdminApp } from "../../../../../0-core/apis/controllers/controller-api-admin.app";

export class EdicaoClienteController extends ControllerApiAdminApp {
    private readonly _edicaoServicoApp = new EdicaoServicoApp();

    async executar(contexto: ContextoRota) {
        const idCliente = contexto.requisicao.params.id;
        const requisicao = (contexto.requisicao.body as EdicaoClienteViewModelController) as EdicaoViewModelServicoApp;
        requisicao.idCliente = +idCliente;

        const resultadoServico = await this._edicaoServicoApp.executar(requisicao);
        this.resultadoController(contexto.resposta, resultadoServico, StatusCodeRespostas.ATUALIZACAO);
    }
}