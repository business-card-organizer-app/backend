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

beforeAll(async () => {
    await db('users').insert(user)
});

describe('POST /api/user/:id/event', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .post(`/api/user/${1}/event`)
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
            .post(`/api/user/${1}/event`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .post(`/api/user/${'a'}/event`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user doestnt exists', () => {
        return request
            .post(`/api/user/${10}/event`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("User doesn't exists")
            })
    });

    it('should return 400 if events validation is wrong', () => {
        const message = {
            event_date: ['The event date field is required.'],
            event_venue: ['The event venue field is required.']
        }

        return request
            .post(`/api/user/${1}/event`)
            .set('token', token)
            .send({
                name_event: 'kekdkdd'
            })
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toMatchObject(message)
            })
    });

    it('should return 201 when event is created', () => {
        return request
            .post(`/api/user/${1}/event`)
            .set('token', token)
            .send({
                name_event: 'kekdkdd',
                event_date: '12/01/2019',
                event_venue: 'zoom'
            })
            .then(res => {
                expect(res.status).toBe(201)
                expect(res.body.data).toHaveLength(1)
            })
    });

});

describe('GET /api/user/:/event', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .get(`/api/user/${1}/event`)
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
            .get(`/api/user/${1}/event`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .get(`/api/user/${'a'}/event`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user doestnt exists', () => {
        return request
            .get(`/api/user/${10}/event`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("User doesn't exists")
            })
    });

    it('should return 200 to gat all events', () => {
        return request
            .get(`/api/user/${1}/event`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200);
            })
    });
});

describe("PATCH /api/user/id/event/event_id", () => {
    it('should return 401 if token is not provided', () => {
        return request
            .patch(`/api/user/${1}/event/${1}`)
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
            .patch(`/api/user/${1}/event/${1}`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .patch(`/api/user/${'a'}/event/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user doestnt exists', () => {
        return request
            .patch(`/api/user/${10}/event/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("User doesn't exists")
            })
    });

    it('should return 400 if events validation is wrong', () => {
        const message = {
            event_date: ['The event date field is required.'],
            event_venue: ['The event venue field is required.']
        }

        return request
            .patch(`/api/user/${1}/event/${1}`)
            .set('token', token)
            .send({
                name_event: 'kekdkdd'
            })
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toMatchObject(message)
            })
    });

    it('should return 201 when event is created', () => {
        return request
            .patch(`/api/user/${1}/event/${1}`)
            .set('token', token)
            .send({
                name_event: 'kekdkdd',
                event_date: '12/01/2019',
                event_venue: 'zoom'
            })
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    });

});

describe('DELETE /api/user/:id/event/:event_id', () => {
    it('should return 401 if token is not provided', () => {
        return request
            .delete(`/api/user/${1}/event/${1}`)
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
            .delete(`/api/user/${1}/event/${1}`)
            .set('token', wrongtoken)
            .then(res => {
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('Invalid User Token')
            })
    });

    it('should return 400 if id is not a number', () => {
        return request
            .delete(`/api/user/${'a'}/event/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(400)
                expect(res.body.message).toBe('Invalid id type')
            })
    });

    it('should return 404 if user doestnt exists', () => {
        return request
            .delete(`/api/user/${10}/event/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("User doesn't exists")
            })
    });

    it('should return 404 if event doestnt exists', () => {
        return request
            .delete(`/api/user/${1}/event/${110}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(404)
                expect(res.body.message).toBe("Event don't exists")
            })
    });

    it('should return 200 if event was deleted', () => {
        return request
            .delete(`/api/user/${1}/event/${1}`)
            .set('token', token)
            .then(res => {
                expect(res.status).toBe(200)
                expect(res.body.data).toHaveLength(1)
            })
    });


})