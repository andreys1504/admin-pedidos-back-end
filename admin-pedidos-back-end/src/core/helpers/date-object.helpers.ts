
export const dateDDMMAAAA = (data: Date) => {
    const dd = String(data.getDate()).padStart(2, '0');
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const aaaa = data.getFullYear();

    return dd + '/' + mm + '/' + aaaa;
}

export const dateStandardFormat = (dd: number, mm: number, aaaa: number) => {
    return new Date(+aaaa, (+mm) - 1, +dd);
}

export const dateAAAAMMDD = (data: Date) => {
    return dateStandardFormatInString(data.getDate(), data.getMonth() + 1, data.getFullYear());
}

//#region Auxiliares

const dateStandardFormatInString = (dd: number, mm: number, aaaa: number) => {
    return aaaa.toString() + - + mm.toString() + - + dd.toString();
}

//#endregion