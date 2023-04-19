import request from '../request'

test('Should /visits/:id', async () => {
    const response = await request(
        'http://localhost:3000/visits/ton.com.br',
        'GET'
    )
    expect(response.status).toBe(200)
})
