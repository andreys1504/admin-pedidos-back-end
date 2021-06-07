
export const recuperarValorBoleanoRequisicao = (valor?: string): boolean | undefined => {
    if (valor)
        return valor === 'true' ? true : false;

    return undefined;
}

