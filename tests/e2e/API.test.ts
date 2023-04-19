import { request } from '../request'

const url = 'http://localhost:3000/visits/ton.com.br'

jest.mock('../request', () => {
    return {
        request: jest.fn(() => {
            const expectedStatusCode = 200
            return Promise.resolve({
                status: expectedStatusCode,
                data: {
                    url,
                    visits: 1
                }
            })
        })
    }
})

afterAll(() => {
    jest.restoreAllMocks()
})

test('Should /visits/:id', async () => {
    const response = await request(url, 'GET')
    expect(response.status).toBe(200)
    expect(response.data.url).toBe(url)
    expect(response.data.visits).toBe(1)
})
