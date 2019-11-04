const app = require('app');
const request = require('supertest')(app);
const assert = require('assert');
const db = require('config/mongo');

describe('CRUD Teams', () => {

    let id;
    let team = { name: 'Piraporinha'};
    let token;
    
    beforeEach((done) => {
        db.collection('teams').insert(team, (err, data) => {
            id = String(data._id);
            done();
        });
    });

    afterEach((done) => {
        db.collection('teams').remove({}, done);
    });

    before(() => {
        request
            .post("/auth")
            .send({ user: "admin", pass: "caneta"})
            .then(result => {
                token = result.body.token;
            })
            .catch()
    });

    it.only("GET /teams should list", () => {
        
        return request
                .get("/teams")
                .set('x-jwt', token)
                .then(result => {
                    assert.equal(result.status, 200);
                    assert.ok(result.body.itens.length > 0);
                    assert.ok(result.body.total > 0);
                    assert.ok(result.body.itens[0].name);
                });
        
    });
    
    it("GET /teams/:id should a team", () => {

        return request  
                .get(`/teams/${id}`)
                .then(result => {
                    assert.equal(result.status, 200);
                    assert.equal(result.body.name, "Piraporinha");
                });

    });

    it("GET /teams/:id should a error mongo id", () => {

        return request  
                .get('/teams/idinvalido')
                .then(result => {
                    assert.equal(result.status, 422);
                    assert.equal(result.body.message, "invalid mongo id");
                });

    });

    it("POST /teams create a team", () => {

        let team = { name: 'Manchester'};

        return request 
                .post('/teams')
                .send(team)
                .then(result => {
                    assert.equal(result.status, 201);
                    assert.equal(result.body.name, "Manchester");
                });
    });


    it("PUT /teams should list", () => {

        let team = { name: 'Flamengo'};

        return request 
                .put(`/teams/${id}`)
                .send(team)
                .then(result => {
                    assert.equal(result.status, 200);
                    assert.deepEqual(result.body, { n: 1, nModified: 1, ok: 1 })
                });

    });

    it("DELETE /teams should delete", () => {
        return request
                .delete(`/teams/${id}`)
                .then(result => {
                    assert.equal(result.status, 204);
                });
    });

});