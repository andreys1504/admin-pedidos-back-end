
export const getBooleanValueRequest = (value?: string): boolean | undefined => {
    if (value) {
        return value === 'true' ? true : false;
    }

    return undefined;
}
