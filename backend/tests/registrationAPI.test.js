const request = require('supertest')
const app = require('../server')
describe('registration test', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/registration')
      .send({
        username: 'userunittesting',
        password: 'passwordunittesting',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.text).toBe('{\"value\":\"success\"}')
  })
})