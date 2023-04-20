import { ValidationException } from '../exceptions/ValidationException'

export class User {
    password: string
    isAdmin: boolean
    
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        password: string,
        isAdmin = false
    ) {
        this.password = password
        this.isAdmin = isAdmin
        this.validate()
    }

    private validate(): void {
        if (!this.id) throw new ValidationException('User ID cannot be empty')
        if (!this.name) throw new ValidationException('Name cannot be empty')
        if (this.isInvalidEmail()) throw new ValidationException('Invalid email')
        if (this.isInvalidPassword()) throw new ValidationException('Invalid password')
    }

    private isInvalidEmail(): boolean {
        return !/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(this.email)
    }

    private isInvalidPassword(): boolean {
        return this.password.length < 6
    }

    setAdmin(): void {
        this.isAdmin = true
    }
}
