import { Notification } from "../../notifications/notification";

export interface ResponseAppService<T> {
    success: boolean;
    notifications: Notification[];
    data: T
}