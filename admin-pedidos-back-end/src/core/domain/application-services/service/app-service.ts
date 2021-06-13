import { Notification } from "../../../notifications/notification";
import { RequestAppService } from "../request/request-app-service";
import { ResponseAppService } from "../response/response-app-service";

export abstract class AppService<TDataResponse> {
  abstract handleAsync(
    request: RequestAppService
  ): Promise<ResponseAppService<TDataResponse | null>>;

  protected returnNotification(key: string, message: string) {
    const notifications = new Array<Notification>();
    notifications.push(new Notification(key, message));

    return new ResponseAppService<TDataResponse | null>(false, null, notifications);
  }
  
  protected returnNotifications(notifications: Notification[]) {
    return new ResponseAppService<TDataResponse | null>(false, null, notifications);
  }

  protected returnData(data: TDataResponse | null) {
    return new ResponseAppService<TDataResponse | null>(true, data, [] as Notification[]);
  }

  protected returnSuccess() {
    return new ResponseAppService<TDataResponse | null>(true, null, [] as Notification[]);
  }
}
