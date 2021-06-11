import { Notification } from "../../notifications/notification";
import { ResponseService } from "../response/response-service";

export abstract class AppService {
    protected retornoErro(mensagens: Notification[]) {
        return {
            sucesso: false,
            mensagens
        } as ResponseService<any>;
    }

    protected retornoSucesso<TRetorno>(dadosRetorno: TRetorno) {
        return {
            sucesso: true,
            dados: dadosRetorno
        } as ResponseService<TRetorno>;
    }
}