export default class InvalidParams extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PasswordNotMatchingError";
    }
}