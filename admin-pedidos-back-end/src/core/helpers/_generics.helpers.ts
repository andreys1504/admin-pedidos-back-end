
export const getNumbersText = (value: string): string => {
    if (!value)
        return '';

    //value.match(/\d+/g).map(Number);
    return value.replace(/\D/g, "");
}

export const copyObject = (value: object) => {
    return JSON.parse(JSON.stringify(value));
}

export const generateGuid = () => {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
}
