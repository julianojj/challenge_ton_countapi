import { UserRepository } from '../domain/UserRepository'
import { ValidationException } from '../exceptions/ValidationException'

export class GetUser {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async execute(userId: string): Promise<GetUserOutput> {
        if (!userId) throw new ValidationException('User ID cannot be empty')
        const existinUser = await this.userRepository.find(userId)
        if (!existinUser) throw new ValidationException('User not found')
        return {
            id: existinUser.id,
            name: existinUser.name,
            email: existinUser.email,
            isAdmin: existinUser.isAdmin
        }
    }
}

type GetUserOutput = {
    id: string,
    name: string,
    email: string,
    isAdmin: boolean
}
