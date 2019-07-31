const request = require('./server');
const db = require('../../data/dbConfig');
const jwt = require('../../config/auth');

const token = jwt.generateToken({
    id: 1,
    email: 'nmereginivincent@gmail.com'
});

const user = {
    first_name: 'Vince',
    last_name: 'Vince',
    email: 'nmereginivincent@gmail.com',
    password: '12345',
};

const card = {
    qr_code: "https://www.google.com",
    occupation: "Software engineer",
    phone: "08097425429"
}

beforeAll(async () => {
    await db('users').insert(user)
});

describe('POST /api/user/:id/card', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .post(`/api/user/${1}/card`)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('token is required')
            })
    });

    it('should return 401 if token is invalid provided', () => {
        const wrongtoken = jwt.generateToken({
            id: 1,
            email: 'nmeregini'
        })
        return request
            .post(`/api/user/${1}/card`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .post(`/api/user/${'a'}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 400 if fields are incomplete', () => {
        const message = {
            "qr_code": [
                "The qr code field is required."
            ],
            "occupation": [
                "The occupation field is required."
            ],
            "phone": [
                "The phone field is required."
            ]
        }
        return request
            .post(`/api/user/${1}/card`)
            .set('token', token)
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toMatchObject(message)
            })
    })

    it('should return 201 if card was created', () => {
        return request
            .post(`/api/user/${1}/card`)
            .set('token', token)
            .send(card)
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.data).toHaveLength(1)
            })
    });

    it('should return 400 if user has card', () => {
        return request
            .post(`/api/user/${1}/card`)
            .set('token', token)
            .send(card)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('You already have a virtual card')
            })
    })

});