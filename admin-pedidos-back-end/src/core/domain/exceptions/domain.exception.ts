
export class DomainException extends Error {
    constructor(public message: string) {
        super(message);
    }
}
