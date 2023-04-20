import bcrypt from 'bcrypt'
import { Hasher } from './Hasher'

export class Bcrypt implements Hasher {
    encrypt(password: string): string {
        const SALT_OR_ROUNDS = 10
        return bcrypt.hashSync(password, SALT_OR_ROUNDS)
    }
}
