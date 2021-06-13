import { Like as LikeTypeorm, FindOperator, IsNull as IsNullTypeorm, Not as NotTypeorm } from "typeorm";

export function Like<T>(value: T | FindOperator<T>): FindOperator<T> {
    return LikeTypeorm<T>(value);
} 

export function IsNull() {
    return IsNullTypeorm();
}

export function Not(valor: any) {
    return NotTypeorm(valor);
}

//TODO
export function ValidSqlParameter(valor: string) {
    return !valor.match(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi);
}
