import { Pool, PoolConnection, createPool } from 'mariadb'
import { User } from '../../core/domain/User'
import { UserRepository } from '../../core/domain/UserRepository'

export class UserREpositoryDatabase implements UserRepository {
    private pool: Pool
    private connection: PoolConnection

    constructor() { 
        this.pool = createPool({
            host: process.env.MARIADB_HOST,
            port: parseInt(process.env.MARIADB_PORT),
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DATABASE
        })
    }

    async init() {
        this.connection = await this.pool.getConnection()
    }

    async save(user: User): Promise<void> {
        await this.connection.query('INSERT INTO Users(Id, Name, Email, Password, IsAdmin) VALUES (?, ?, ?, ?, ?)', [user.id, user.name, user.email, user.password, user.isAdmin])
    }

    async find(userId: string): Promise<User> {
        const [result] = await this.connection.query('SELECT * FROM Users WHERE Id = ?', [userId])
        if (!result) return
        const user = new User(
            result.Id,
            result.Name,
            result.Email,
            result.Password,
            result.IsAdmin
        )
        return user
    }

    async findByEmail(email: string): Promise<User> {
        const [result] = await this.connection.query('SELECT * FROM Users WHERE Email = ?', [email])
        if (!result) return
        const user = new User(
            result.Id,
            result.Name,
            result.Email,
            result.Password,
            result.IsAdmin
        )
        return user
    }
}
