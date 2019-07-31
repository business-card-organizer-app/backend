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
    });
});

describe('GET /api/user/:id/card', () => {
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

    it('should return 404 if user has no card', () => {
        return request
            .get(`/api/user/${10}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("You don't have a bussiness card")
            })
    });

    it('should retuen 200 if user has a card', () => {
        return request
            .get(`/api/user/${1}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    })
});

describe('PATCH /api/user/:id/card', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .patch(`/api/user/${1}/card`)
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
            .patch(`/api/user/${1}/card`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .patch(`/api/user/${'a'}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user has no card', () => {
        return request
            .patch(`/api/user/${10}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("You don't have a virtual card")
            })
    });

    it('should return 200 when card is updated', () => {
        return request
            .patch(`/api/user/${1}/card`)
            .set('token', token)
            .send(card)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    })
});

describe('DELETE /api/user/:id/card', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .delete(`/api/user/${1}/card`)
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
            .delete(`/api/user/${1}/card`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .delete(`/api/user/${'a'}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user has no card', () => {
        return request
            .delete(`/api/user/${10}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("You don't have a virtual card")
            })
    });

    it('should return 200 when card is deleted', () => {
        return request
            .delete(`/api/user/${1}/card`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    })
})