export class ValidationException extends Error {
    code: number

    constructor(
        readonly message: string
    ) {
        super(message)
        this.code = 422
    }
}
