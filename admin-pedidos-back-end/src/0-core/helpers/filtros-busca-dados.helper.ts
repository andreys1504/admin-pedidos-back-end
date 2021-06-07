import { Like, FindOperator, IsNull, Not } from "typeorm";

export function Contem<T>(value: T | FindOperator<T>): FindOperator<T> {
    return Like<T>(value);
} 

export function Nulo() {
    return IsNull();
}

export function Nao(valor: any) {
    return Not(valor);
}

//TODO
export function parametroValidoSql(valor: string) {
    return !valor.match(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi);
}