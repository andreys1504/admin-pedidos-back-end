import { Notification } from "../../notifications/notification";
import { ResponseAppService } from "../response/response-app-service";

export abstract class AppService {
    protected returnNotifications(notifications: Notification[]) {
        return {
            success: false,
            notifications
        } as ResponseAppService<any>;
    }

    protected returnSuccess<TRetorno>(dadosRetorno: TRetorno) {
        return {
            success: true,
            data: dadosRetorno
        } as ResponseAppService<TRetorno>;
    }
}