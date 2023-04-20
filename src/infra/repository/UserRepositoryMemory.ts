import { User } from '../../core/domain/User'
import { UserRepository } from '../../core/domain/UserRepository'

export class UserRepositoryMemory implements UserRepository {
    users: User[]

    constructor() { 
        this.users = []
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async find(userId: string): Promise<User> {
        return this.users.find(user => user.id === userId)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email)
    }  
}
