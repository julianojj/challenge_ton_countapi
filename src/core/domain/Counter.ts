import { ValidationException } from '../exceptions/ValidationException'

export class Counter {
    count: number

    constructor(
        count: number,
        readonly url: string
    ) {
        this.count = count
        this.validate()
    }

    private validate(): void {
        if (this.count < 0) {
            throw new ValidationException('Count cannot be negative')
        }
    }
}
