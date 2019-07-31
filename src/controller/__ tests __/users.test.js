const request = require('./server')
const db = require('../../data/dbConfig');
const jwt = require('../../config/auth');
// beforeAll(async () => {
//     await db('users').truncate()
// })
describe('POST api/register', () => {
    it('should return 400 if required field are not passed', () => {
        const user = {
            first_name: 'Vince',
            email: 'nmereginivincent@gmail.com',
            password: 12345,
        };
        return request
            .post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('firstname, lastname, password and email are required');
            })
    });
    it('should return 400 when an invalid email is passed', () => {
        const user = {
            first_name: 'Vince',
            last_name: 'Vince',
            email: 'nmereginivincentcom',
            password: '12345',
        };
        return request
            .post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid email type')
            });
    });
    it('should return 201 when a valid info is passed', () => {
        const user = {
            first_name: 'Vince',
            last_name: 'Vince',
            email: 'nmereginivincent@yahoo.com',
            password: '12345',
        };
        return request
            .post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.data).toHaveLength(1)
            });
    });
    it('should return 400 when a user already exists', () => {
        const user = {
            first_name: 'Vince',
            last_name: 'Vince',
            email: 'nmereginivincent@yahoo.com',
            password: '12345',
        };
        return request
            .post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('User already exists')
            });
    });
});

describe('POST /api/login', () => {
    it('should return 400 if email or password is missing', () => {
        return request
            .post('/api/login')
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('email and password are required')
            })
    });

    it('should return 400 if email is not a valid email type', () => {
        return request
            .post('/api/login')
            .send({
                email: 'vincent',
                password: '12345'
            })
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid email type')
            })
    });

    it('should return 200 if user information are correct', () => {
        return request
            .post('/api/login')
            .send({
                email: 'nmereginivincent@yahoo.com',
                password: '12345'
            })
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    });

    it('should return 400 if the user information and password is not correct', () => {
        return request
            .post('/api/login')
            .send({
                email: 'nmereginivincent@yahoo.com',
                password: '1234567'
            })
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid credetianls')
            })
    });
});

describe('GET api/user/:id', () => {
    it('should return 400 if id is not a number', () => {
        return request
            .get(`/api/user/${'a'}`)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 401 if token is not provided', () => {
        return request
            .get(`/api/user/${1}`)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('token is required')
            })
    });

    it('should return 401 if token is invalid provided', () => {
        const token = jwt.generateToken({
            id: 1,
            email: 'nmeregini'
        })
        return request
            .get(`/api/user/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 200 if valid token is provided', () => {
        const token = jwt.generateToken({
            id: 2,
            email: 'nmereginivincent@yahoo.com'
        })
        return request
            .get(`/api/user/${2}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    })
})