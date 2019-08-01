const request = require('./server');
const jwt = require('../../config/auth');

const token = jwt.generateToken({
    id: 1,
    email: 'nmereginivincent@gmail.com'
});

describe('GET /api/user/:id/collection/:card_id', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .get(`/api/user/${1}/collection/${1}`)
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
            .get(`/api/user/${1}/collection/${1}`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .get(`/api/user/${'a'}/collection/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if card dont exists', () => {
        return request
            .get(`/api/user/${1}/collection/${10}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe('No such card in collection')
            })
    });

    it('should return the list of card', () => {
        return request
            .get(`/api/user/${1}/collection/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    })
});

describe('POST /api/user/:id/collection', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .post(`/api/user/${1}/collection`)
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
            .post(`/api/user/${1}/collection`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .post(`/api/user/${'a'}/collection`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 400 if body type is not correct', () => {
        const err = {
            card_id: ['The card id field is required.']
        }
        return request
            .post(`/api/user/${1}/collection`)
            .set('token', token)
            .send({})
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toMatchObject(err)
            })
    });

    it('should return 400 if user already have the bussiness card', () => {
        return request
            .post(`/api/user/${1}/collection`)
            .set('token', token)
            .send({
                card_id: 1
            })
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Already have these bussiness card')
            })
    });

    it('should return a 404 if bussiness card dont exist', () => {
        return request
            .post(`/api/user/${1}/collection`)
            .set('token', token)
            .send({
                card_id: 10
            })
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("Bussiness card does not exists")
            })
    });

    it('should return 201 when a card is added to a collection', () => {
        return request
            .post(`/api/user/${2}/collection`)
            .set('token', token)
            .send({
                card_id: 1
            })
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.data).toHaveLength(1)
            })
    })
});

describe('GET /api/user/:id/collection', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .get(`/api/user/${1}/collection`)
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
            .get(`/api/user/${1}/collection`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .get(`/api/user/${'a'}/collection`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user has no cards', () => {
        return request
            .get(`/api/user/${10}/collection`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("No cards in your collection")
            })
    });

    it('should return 200 if user has a cards in his collection', () => {
        const data = [{
            occupation: 'Software engineer',
            phone: '08097425294',
            name_event: null,
            event_date: null,
            event_venue: null,
            event_location: null
        }];

        return request
            .get(`/api/user/${1}/collection`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toMatchObject(data)
                expect(res.body.data).toHaveLength(1)
            })
    })
})