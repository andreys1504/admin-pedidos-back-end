
export const dataDDMMAAAA = (data: Date) => {
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const aaaa = data.getFullYear();

    return dd + '/' + mm + '/' + aaaa;
}

export const dataFormatoPadrao = (dd: number, mm: number, aaaa: number) => {
    return new Date(+aaaa, (+mm) - 1, +dd);
}

export const dataAAAAMMDD = (data: Date) => {
    return dataFormatoPadraoEmString(data.getDate(), data.getMonth() + 1, data.getFullYear());
}

//#region Auxiliares

const dataFormatoPadraoEmString = (dd: number, mm: number, aaaa: number) => {
    return aaaa.toString() + - + mm.toString() + - + dd.toString();
}

//#endregion