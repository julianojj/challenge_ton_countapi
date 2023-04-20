import { User } from './User'

export interface UserRepository {
    save(user: User): Promise<void>
    find(userId: string): Promise<User>
    findByEmail(email: string): Promise<User>
}
