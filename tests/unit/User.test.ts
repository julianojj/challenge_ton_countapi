import { User } from '../../src/core/domain/User'

test('Should throw exception if empty user id', () => {
    expect(() => {
        new User(
            '',
            'User',
            'user@example.com',
            '123456'
        )
    }).toThrowError('User ID cannot be empty')
})

test('Should throw exception if empty user name', () => {
    expect(() => {
        new User(
            '1',
            '',
            'user@example.com',
            '123456'
        )
    }).toThrowError('Name cannot be empty')
})


test('Should throw exception if invalid email', () => {
    expect(() => {
        new User(
            '1',
            'User',
            'user@example',
            '123456'
        )
    }).toThrowError('Invalid email')
})

test('Should throw exception if invalid password', () => {
    expect(() => {
        new User(
            '1',
            'User',
            'user@example.com',
            '12345'
        )
    }).toThrowError('Invalid password')
})

test('Should new user', () => {
    const user = new User(
        '1',
        'User',
        'user@example.com',
        '123456'
    )
    expect(user.id).toBe('1')
    expect(user.name).toBe('User')
    expect(user.email).toBe('user@example.com')
    expect(user.password).toBe('123456')
    expect(user.isAdmin).toBeFalsy()
})

test('Should set admin', () => {
    const user = new User(
        '1',
        'User',
        'user@example.com',
        '123456',
    )
    user.setAdmin()
    expect(user.isAdmin).toBeTruthy()
})
