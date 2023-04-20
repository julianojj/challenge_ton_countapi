import { CreateUser } from '../../src/core/usecases/CreateUser'
import { GetUser } from '../../src/core/usecases/GetUser'
import { Bcrypt } from '../../src/infra/adapters/Bcrypt'
import { UserRepositoryMemory } from '../../src/infra/repository/UserRepositoryMemory'

test('Should create user', async () => {
    const userRepository = new UserRepositoryMemory()
    const hasher = new Bcrypt()
    const createUser = new CreateUser(userRepository, hasher)
    const getUser = new GetUser(userRepository)
    const input = {
        name: 'User',
        email: 'user@example.com',
        password: '123456'
    }
    const output = await createUser.execute(input)
    const user = await getUser.execute(output.id)
    expect(user.id).toBe(output.id)
    expect(user.name).toBe(input.name)
    expect(user.email).toBe(input.email)
    expect(user.isAdmin).toBeFalsy()
})
