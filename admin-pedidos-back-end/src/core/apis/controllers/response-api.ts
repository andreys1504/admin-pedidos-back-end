import { Notification } from "../../domain/notifications/notification";

export interface ResponseApi {
    sucesso: boolean;
    dados: any;
    mensagens: Notification[];
}
