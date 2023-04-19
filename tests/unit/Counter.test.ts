import { Counter } from '../../src/core/domain/Counter'

test('Should throw exception if nevative count', () => {
    expect(() => new Counter(-1, 'https://ton.com.br'))
        .toThrowError('Count cannot be negative')
})

test('Should new counter', () => {
    const counter = new Counter(1, 'https://ton.com.br')
    expect(counter).toBeDefined()
})
