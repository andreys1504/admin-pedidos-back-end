import { Notification } from "../../notifications/notification";

export interface ResponseService<T> {
    sucesso: boolean;
    mensagens: Notification[];
    dados: T
}