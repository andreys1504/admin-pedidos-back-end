import * as validate from "gerador-validador-cpf";
import { getNumbersText } from "../helpers";
import { Notification } from "../notifications/notification";

export class Flunt {
  constructor(public notifications: Notification[] = []) {}

  get isValid(): boolean {
    return this.notifications.length === 0;
  }

  isEqual = (valuea: any, valueb: any, key: string, message: string) => {
    if (valuea != valueb) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isNotEqual = (valuea: any, valueb: any, key: string, message: string) => {
    if (valuea == valueb) {
      this.notifications.push(new Notification(key, message));
    }
  };

  hasMinLen = (value: any, min: number, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length < min) {
      this.notifications.push(new Notification(key, message));
    }
  };

  hasMaxLen = (value: any, max: number, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length > max) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isBetween = (
    value: any,
    min: number,
    max: number,
    key: string,
    message: string
  ) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length < min || value.length > max) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isFixedLen = (value: any, len: number, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length !== len) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isEmail = (value: any, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isNotNull = (value: any, key: string, message: string) => {
    if (value === null || value === undefined) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isNotNullOrEmpty = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefined(value)) {
      this.notifications.push(new Notification(key, message));
      return;
    }

    value = value.trim();
    if (!value.length) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isGreaterThan = (valuea: any, valueb: any, key: string, message: string) => {
    if (
      this.isNullOrUndefinedOrEmpty(valuea) ||
      this.isNullOrUndefinedOrEmpty(valueb)
    ) {
      return;
    }

    if (valuea > valueb) {
      this.notifications.push(new Notification(key, message));
    }
  };

  emptyMoney = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    const valorUnitarioLimpo = getNumbersText(value);
    let quantidadeZerosValor = 0;
    for (var i = 0; i < valorUnitarioLimpo.length; i++) {
      if (valorUnitarioLimpo.charAt(i) === "0") {
        quantidadeZerosValor++;
      }
    }

    if (quantidadeZerosValor === valorUnitarioLimpo.length) {
      this.notifications.push(new Notification(key, message));
      return false;
    }

    return true;
  };

  isCep = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    value = getNumbersText(value);
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (!value || value.length != 8) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isPhone = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    value = getNumbersText(value);
    if (value.length < 10 || value.length > 16) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isCpf = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length < 11) {
      for (let i = 1; i < 12; i++) {
        value = "0" + value;

        if (value.length == 11) break;
      }
    }

    if (!validate.validate(value)) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isCnpj = (value: string, key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value)) {
      return;
    }

    if (value.length < 14 || value.length > 14) {
      this.notifications.push(new Notification(key, message));
    }
  };

  isRequiredCollection = (value: any[], key: string, message: string) => {
    if (this.isNullOrUndefinedOrEmpty(value) || value.length < 1) {
      this.notifications.push(new Notification(key, message));
      return false;
    }

    return true;
  };

  isRequired = (value: any, key: string = "", message: string = "") => {
    if (value === "" || value === null || value === undefined) {
      if (key || message) {
        this.notifications.push(new Notification(key, message));
      }
      return false;
    }

    if (value.constructor === String && value.toString().trim().length <= 0) {
      if (key || message) {
        this.notifications.push(new Notification(key, message));
      }
      return false;
    }

    return true;
  };

  static isCpf = (value: string) => {
    if (value.length <= 11) return true;

    return false;
  };

  clear() {
    this.notifications = [];
  }

  private isNullOrUndefined(value: any) {
    if (value === null || value === undefined) {
      return true;
    }

    return false;
  }

  private isNullOrUndefinedOrEmpty(value: any) {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return true;
    }

    return false;
  }
}
