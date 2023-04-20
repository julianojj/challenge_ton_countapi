import { randomUUID } from 'crypto'
import { Hasher } from '../../infra/adapters/Hasher'
import { User } from '../domain/User'
import { UserRepository } from '../domain/UserRepository'
import { ValidationException } from '../exceptions/ValidationException'

export class CreateUser {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hasher: Hasher
    ) {}

    async execute(input: CreateUserInput): Promise<CreateUserOutput> {
        const user = new User(
            randomUUID(),
            input.name,
            input.email,
            input.password
        )
        user.password = this.hasher.encrypt(user.password)
        const existinUser = await this.userRepository.findByEmail(user.email)
        if (existinUser) {
            throw new ValidationException('User already exists')
        }
        await this.userRepository.save(user)
        return {
            id: user.id
        }
    }
}

type CreateUserInput = {
    name: string,
    email: string,
    password: string
}

type CreateUserOutput = {
    id: string
}
