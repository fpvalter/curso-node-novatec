const app = require('app');
const request = require('supertest')(app);
const assert = require('assert');

describe('main tests', () => {

    it('GET / should respond 200', () => {
        //throw new Error('erro');

        return request
                .get('/')
                .then(result => {
                    assert.equal(200, result.status);
                });


    });

    it('GET /contato should respond 200', () => {
        return request
                .get('/contato')
                .then(result => {
                    assert.equal('text/html; charset=utf-8', result.headers['content-type']);
                    assert.equal(201, result.status);
                    assert.equal('Contato!!', result.text);
                });
    });

    it('GET /banana should throw not found', () => {
        return request
                .get('/banana')
                .then(result => {
                    assert.equal(404, result.status);
                });
    });
});